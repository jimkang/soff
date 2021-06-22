/* global process, __dirname */

var fs = require('fs');
var sanitizeHtml = require('sanitize-html');

var allowedTags = [
  'h3',
  'h4',
  'h5',
  'h6',
  'blockquote',
  'p',
  'ul',
  'ol',
  'nl',
  'li',
  'b',
  'i',
  'strong',
  'em',
  'strike',
  'code',
  'hr',
  'br',
  'div',
  'table',
  'thead',
  'caption',
  'tbody',
  'tr',
  'th',
  'td',
  'pre'
];

if (process.argv.length < 3) {
  console.error(
    'Usage: node tools/clean-text.js <file with events.json> > new-events.json'
  );
  process.exit();
}

var events = JSON.parse(fs.readFileSync(__dirname + '/../' + process.argv[2]));

console.log(JSON.stringify(events.map(cleanText), null, 2));

function cleanText(event) {
  event.cleanedContentHTML = sanitizeHtml(event.contentHTML, {
    allowedTags,
    allowedAttributes: []
  });
  // You need to hand edit this.
  event.skimmablePlaceholder = event.cleanedContentHTML;
  return event;
}
