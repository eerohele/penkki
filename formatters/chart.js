'use strict'

const
  chart = require('chart'),
  R     = require('ramda')

const options = { width: 80, height: 24 }

module.exports = (data) => {
  let formatter = R.flip(R.curry(chart))(options)
  return R.join(' ', R.map(R.pipe(R.tail, formatter), data))
}
