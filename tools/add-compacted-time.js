/* global process, __dirname */

var fs = require('fs');

if (process.argv.length < 3) {
  console.error(
    'Usage: node tools/add-compacted-time.js <file with events.json> > new-events.json'
  );
  process.exit();
}

const arbitraryTimeChunkCompactUnits = 30;
const maxGapBetweenEventsCompactUnits = 60 * 15;

var timesScheduled = [];
var events = JSON.parse(fs.readFileSync(__dirname + '/../' + process.argv[2]));
console.log(JSON.stringify(events.map(addToEvent), null, 2));

function addToEvent(event) {
  var startTimeInCompactUnits;
  if (event.years.tooBig) {
    if (timesScheduled.length > 0) {
      startTimeInCompactUnits =
        timesScheduled[timesScheduled.length - 1] +
        maxGapBetweenEventsCompactUnits;
    } else {
      startTimeInCompactUnits = maxGapBetweenEventsCompactUnits;
    }
  } else if (event.years.base === 10) {
    startTimeInCompactUnits = event.years.exp;
  } else {
    const yearsExpanded = Math.pow(event.years.base, event.years.exp);
    if (yearsExpanded >= 1) {
      startTimeInCompactUnits = Math.log10(yearsExpanded);
    } else {
      startTimeInCompactUnits = yearsExpanded;
    }
  }
  if (isNaN(startTimeInCompactUnits)) {
    startTimeInCompactUnits =
      timesScheduled[timesScheduled.length - 1] +
      arbitraryTimeChunkCompactUnits;
  }
  if (timesScheduled.length > 0) {
    const lastTimeScheduled = timesScheduled[timesScheduled.length - 1];
    if (
      startTimeInCompactUnits - lastTimeScheduled >
      maxGapBetweenEventsCompactUnits
    ) {
      // Crunch it down.
      startTimeInCompactUnits =
        lastTimeScheduled + maxGapBetweenEventsCompactUnits;
    }
  }

  timesScheduled.push(startTimeInCompactUnits);

  event.startTimeInCompactUnits = startTimeInCompactUnits;
  return event;
}
