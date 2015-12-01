"use strict";

const cheerio = require('cheerio'),
         path = require('path'),
           fs = require('fs'),
            R = require('ramda')

module.exports = html;

function html(data, command) {
  let template = path.resolve(__dirname, '../templates/index.html')
  let html = fs.readFileSync(template, 'utf8')
  let $ = cheerio.load(html)
  $("#data").text("var COLUMNS = " + JSON.stringify(R.prepend(command, data)))
  return $.html()
}
