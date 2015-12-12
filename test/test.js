/*globals describe, beforeEach, afterEach, it */

'use strict'

const assert = require('assert'),
  sleep = require('sleep'),
  simple = require('simple-mock'),
  penkki = require('../lib/penkki'),
  cheerio = require('cheerio'),
  cp = require('child_process'),
  R = require('ramda')

function is(actual, expected) {
  assert.deepEqual(
    R.map((x) => [R.head(x), R.length(R.tail(x))], actual), expected
  )
}

describe('Penkki', () => {
  beforeEach(() => simple.mock(cp, 'execSync', () => { sleep.usleep(100) }))
  afterEach(() => simple.restore())

  it('runs one command once', () => {
    is(penkki.run('ls', { times: 1 }), [ ['"ls"', 1] ])
  })

  it('runs one command twice', () => {
    is(penkki.run('ls', { times: 2 }), [ [ '"ls"', 2 ] ])
  })

  it('runs two commands once', () => {
    is(penkki.run('ls,df', { times: 1 }), [ [ '"ls"', 1 ], [ '"df"', 1 ] ])
  })

  it('runs two commands twice', () => {
    is(penkki.run('ls,df', { times: 2 }), [ [ '"ls"', 2 ], [ '"df"', 2 ] ])
  })

  it('can use JSON formatter', () => {
    assert.ok(JSON.parse(JSON.stringify(penkki.run('ls', { times: 1 }))))
  })

  it('can use Chart formatter', () => {
    assert.ok(penkki.run('ls', { times: 10, formatter: 'chart' }).length > 0)
  })

  it('can use Sparkly formatter', () => {
    assert.ok(penkki.run('ls', {times: 10, formatter: 'sparkly'}).length > 0)
  })

  it('can use Bars formatter', () => {
    assert.ok(penkki.run('ls', { times: 10, formatter: 'bars' }).length > 0)
  })

  it('can use HTML formatter', () => {
    let $ = cheerio.load(penkki.run('ls', { times: 10, formatter: 'html' }))
    assert.notEqual($('#data').html(), null)
  })
})
