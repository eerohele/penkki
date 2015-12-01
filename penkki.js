#!/usr/bin/env node

"use strict"

const chalk = require('chalk'),
       args = require('command-line-args'),
         cp = require('child_process'),
          R = require('ramda')

const error = chalk.bold.red

const header = `${chalk.blue("Penkki")}. Run a command ${chalk.italic("n")} times and measure how long it takes.`

const cli = args([
  { name:          'command',
    type:          String,
    multiple:      true,
    defaultOption: true,
    description:   'The command to run.'
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
    description:   'The number of times to run the command.'
  },
  { name:          'help',
    alias:         'h',
    type:          Boolean,
    description:   'Show this help.'
  }
])

const options = cli.parse()

// Every method is a function that returns the options for the given formatter.
const formatterOptions = {
  chart: () => { return { width: 80, height: 25 } },
  html:  R.identity
}

if (!options.command || options.help) {
  console.log(header)
  console.log(cli.getUsage())
  process.exit(1)
}

function time(command) {
  let before = Date.now()
  cp.execSync(command)
  let after = Date.now()

  return after - before
}

// Get the output formatter.
//
// Try to load the given formatter in the "formatters" directory. If not found,
// try the dependencies. If still not found, throw an error.
function loadFormatter(name) {
  try {
    return require('./formatters/' + name)
  } catch (_) {
    try {
      return require(name)
    } catch (e) {
      console.error(`${error("ERROR:")} Couldn't load formatter "${name}":`)
      console.error(e)
      process.exit(1)
    }
  }
}

function main() {
  const command = options.command.join(' ')
  const data = R.times(R.partial(time, [command]), options.times)
  let formatter = loadFormatter(options.formatter)
  return formatter(data, formatterOptions[formatter.name](command))
}

console.log(main())
