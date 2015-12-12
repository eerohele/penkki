'use strict'

const process = require('process'),
  chart = require('chart'),
  R = require('ramda')

module.exports = (data) => {
  let options = {
    width: Math.floor(process.stdout.columns / 2),
    height: process.stdout.rows
  }

  let formatter = R.flip(R.curry(chart))(options)
  return R.join(' ', R.map(R.pipe(R.tail, formatter), data))
}
