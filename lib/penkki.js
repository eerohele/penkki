'use strict'

const csv = require('babyparse'),
  cp = require('child_process'),
  R = require('ramda')

module.exports = {
  defaultFormatter: 'json',
  run: run
}

function time(command) {
  let before = Date.now()
  cp.execSync(command)
  let after = Date.now()

  return after - before
}

function format(name, data) {
  try {
    return require('../formatters/' + name)(data)
  } catch (e) {
    console.error(`Couldn't load formatter "${name}":`)
    console.error(e)
    process.exit(1)
  }
}

function benchmark(command, times) {
  return R.prepend(JSON.stringify(command),
         R.times(R.partial(time, [command]), times))
}

function getCommands(command) {
  return R.head(csv.parse(command, { delimiter: ',' }).data)
}

function run(cmdString, opts) {
  let formatter = opts.formatter || this.defaultFormatter
  let commands = getCommands(cmdString)
  let result = R.map(cmd => benchmark(cmd, opts.times), commands)
  return format(formatter, result)
}
