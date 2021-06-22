/* global process, __dirname */

var fs = require('fs');

if (process.argv.length < 3) {
  console.error(
    'Usage: node tools/clean-events.js <file with events.json> > new-events.json'
  );
  process.exit();
}

var events = JSON.parse(fs.readFileSync(__dirname + '/../' + process.argv[2]));
console.log(JSON.stringify(events.map(addToEvent), null, 2));

function addToEvent(event) {
  delete event.freq;
  delete event.freqPerTransformedUnit;
  delete event.bottomFreq;
  delete event.transformedUnits;
  return event;
}
