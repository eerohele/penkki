'use strict'

const R = require('ramda'),
  bars = require('bars'),
  process = require('process')

module.exports = (data) => {
  let options = { width: Math.floor(process.stdout.columns / 2) }
  let formatter = R.flip(R.curry(bars))(options)
  let reducer = R.addIndex(R.reduce)((acc, val, i) => R.assoc(i, val, acc), {})
  return R.join('\n', R.map(R.pipe(R.tail, reducer, formatter), data))
}
