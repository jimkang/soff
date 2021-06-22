/* global process, __dirname */

var fs = require('fs');
var randomid = require('@jimkang/randomid')();

if (process.argv.length < 3) {
  console.error(
    'Usage: node tools/add-ids-to-events.js <file with events.json> > new-events.json'
  );
  process.exit();
}

var events = JSON.parse(fs.readFileSync(__dirname + '/../' + process.argv[2]));
console.log(JSON.stringify(events.map(addToEvent), null, 2));

function addToEvent(event) {
  event.id = 'event-' + randomid(4);
  return event;
}
