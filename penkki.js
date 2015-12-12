#!/usr/bin/env node

/*globals require, console*/

'use strict'

const process = require('process'),
  penkki = require('./lib/penkki'),
  chalk = require('chalk'),
  path = require('path'),
  args = require('command-line-args'),
  pkg = require('./package.json'),
  fs = require('fs'),
  R = require('ramda')

function or(ary)  {
  let quoted = R.map(v => '"' + v + '"', ary)
  let head = R.pipe(R.dropLast(1), R.join(', '))(quoted)
  return head + ', or ' + R.last(quoted)
}

function getFormatterList() {
  return R.map(f => (path.basename(f, '.js')), fs.readdirSync('./formatters'))
}

const banner = `${chalk.bold('Penkki')}. ${pkg.description}`

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
    defaultValue:  penkki.defaultFormatter,
    description:   `The formatter to use. Either ${or(getFormatterList())}. Default: "json".`
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
  },
  { name:          'version',
    alias:         'v',
    type:          Boolean,
    description:   'Show version.'
  }
])

const error = (message) => {
  console.error(R.join(' ', [chalk.bold.red('ERROR:'), message]))
}

const options = cli.parse()

function validate(opts, formatterList) {
  if (!(opts.command || opts.commands) || opts.help) {
    console.log(banner)
    console.log(cli.getUsage())
    return false
  }

  if (opts.command && opts.commands) {
    error('Use either --commands or give a single command, not both.')
    return false
  }

  if (!R.contains(opts.formatter, formatterList)) {
    error(`Invalid formatter "${opts.formatter}."`)
    return false
  }

  return true
}

function main(opts) {
  if (opts.version) {
    console.log(pkg.version)
    process.exit(0)
  }

  if (!validate(opts, getFormatterList())) process.exit(1)

  let cmdString = opts.commands || R.join(' ', opts.command)
  return penkki.run(cmdString, opts)
}

console.log(main(options))
