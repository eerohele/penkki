#!/usr/bin/env node

/*globals require, console*/

'use strict'

const
  process = require('process'),
  chalk   = require('chalk'),
  args    = require('command-line-args'),
  csv     = require('babyparse'),
  cp      = require('child_process'),
  R       = require('ramda')

const error = chalk.bold.red

const header = `${chalk.blue('Penkki')}. Run a command ${chalk.italic('n')} times and measure how long it takes.`

const cli = args([
  { name:          'command',
    type:          String,
    multiple:      true,
    defaultOption: true,
    description:   'The command to run.'
  },
  { name:          'commands',
    alias:         'c',
    type:          String,
    description:   'A comma-separated list of commands to run.'
  },
  { name:          'formatter',
    alias:         'f',
    type:          String,
    defaultValue:  'json',
    description:   'The formatter to use. Either "json", "sparkly", "chart", or "html". Default: "json".'
  },
  { name:          'times',
    alias:         't',
    type:          Number,
    defaultValue:  1,
    description:   'The number of times to run the command.'
  },
  { name:          'help',
    alias:         'h',
    type:          Boolean,
    description:   'Show this help.'
  }
])

const options = cli.parse()

// Get the output formatter.
//
// Try to load the given formatter in the "formatters" directory. If not found,
// try the dependencies. If still not found, throw an error.
function loadFormatter(name) {
  try {
    return require('./formatters/' + name)
  } catch (e) {
    console.error(`${error('ERROR:')} Couldn't load formatter "${name}":`)
    console.error(e)
    process.exit(1)
  }
}

function time(command) {
  let before = Date.now()
  cp.execSync(command)
  let after = Date.now()

  return after - before
}

function benchmark(command) {
  return R.prepend(JSON.stringify(command),
         R.times(R.partial(time, [command]), options.times))
}

function format(data) {
  return loadFormatter(options.formatter)(data)
}

function validate() {
  if (!(options.command || options.commands) || options.help) {
    console.log(header)
    console.log(cli.getUsage())
    process.exit(1)
  }

  if (options.command && options.commands) {
    console.error(`${error('ERROR:')} Use either --commands or give a single command, not both.`)
    process.exit(1)
  }
}

function main() {
  validate()

  if (options.commands) {
    let commands = R.head(csv.parse(options.commands).data)
    return format(R.map(command => benchmark(command), commands))
  } else {
    return R.pipe(benchmark, format)(R.join(' ', options.command))
  }
}

console.log(main())
