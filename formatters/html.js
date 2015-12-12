'use strict'

const cheerio = require('cheerio'),
  path = require('path'),
  fs = require('fs')

module.exports = html

function html(data) {
  let template = path.resolve(__dirname, '../templates/index.html')
  let html = fs.readFileSync(template, 'utf8')
  let $ = cheerio.load(html)
  $('#data').text('var COLUMNS = ' + JSON.stringify(data))
  return $.html()
}
