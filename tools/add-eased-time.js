/* global process, __dirname */

const {
  midCompactTimeToMod,
  minCompactTimeToMod,
  maxCompactTimeToMod,
  modRange1,
  modRange2,
  desiredModRange2,
} = require('../consts');

var fs = require('fs');

if (process.argv.length < 3) {
  console.error(
    'Usage: node tools/add-eased-time.js <file with events.json> > new-events.json'
  );
  process.exit();
}

var events = JSON.parse(fs.readFileSync(__dirname + '/../' + process.argv[2]));

// Relax the bunched up parts of the curve a bit.

console.log(JSON.stringify(events.map(addToEvent), null, 2));

function addToEvent(event) {
  if (
    event.startTimeInCompactUnits >= minCompactTimeToMod &&
    event.startTimeInCompactUnits <= midCompactTimeToMod
  ) {
    const proportion =
      (event.startTimeInCompactUnits - minCompactTimeToMod) / modRange1;
    event.easedStartTime =
      minCompactTimeToMod + (proportion / (proportion + 0.25)) * modRange1;
  } else if (
    event.startTimeInCompactUnits > midCompactTimeToMod &&
    event.startTimeInCompactUnits <= maxCompactTimeToMod
  ) {
    // Linear shortening.
    event.easedStartTime =
      midCompactTimeToMod +
      ((event.startTimeInCompactUnits - midCompactTimeToMod) / modRange2) *
        desiredModRange2;
  } else {
    event.easedStartTime = event.startTimeInCompactUnits;
  }
  return event;
}
