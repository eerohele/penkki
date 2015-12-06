'use strict'

const
  sparkly = require('sparkly'),
  R     = require('ramda')

module.exports = (data) => {
  return R.join('\n', R.map(R.pipe(R.tail, sparkly), data))
}
