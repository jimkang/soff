/* global process, __dirname */

var fs = require('fs');

const bottomFreq = 250;
const topFreq = 13500;
const freqRange = topFreq - bottomFreq;
// Next to last event is at 10^10^120 years.
// The transformation is log10(log10(years)).
const estimatedTopTransformedUnit = 120;
const freqPerTransformedUnit = freqRange / estimatedTopTransformedUnit;

if (process.argv.length < 3) {
  console.error(
    'Usage: node tools/add-frequency-to-events.js <file with events.json> > new-events.json'
  );
  process.exit();
}

var events = JSON.parse(fs.readFileSync(__dirname + '/../' + process.argv[2]));
console.log(JSON.stringify(events.map(addToEvent), null, 2));

function addToEvent(event) {
  var years = event.yearsNumber;
  var transformedUnits;
  // A years object's properties are used like this. If the props are:
  // tenExps: 3
  // lastExp: 56
  // 10 ** 10 ** 10 ** 56
  // Before we do that calculation, though, if we know that we're going
  // to do two Math.log10s to the number, we can just take out the first
  // two 10s. It becomes 10 ** 56, and we can skip all the Math.log10s.
  if (years && typeof years === 'object' && years.tenExps) {
    let numberOfLogsToDo = 2;
    let tenExps = years.tenExps;

    if (tenExps > 0) {
      tenExps -= numberOfLogsToDo;
    }
    if (tenExps < 0) {
      numberOfLogsToDo = -1 * tenExps;
      tenExps = 0;
    } else {
      numberOfLogsToDo = 0;
    }

    let bigYears = 1;
    if (tenExps === 0 && years.lastExp) {
      bigYears = years.lastExp;
    } else {
      if (tenExps > 0) {
        bigYears = 10;
      }
      for (let i = 1; i < tenExps; ++i) {
        bigYears = bigYears ** 10;
      }
      if (years.lastExp) {
        bigYears = Math.pow(bigYears, years.lastExp);
      }
    }
    transformedUnits = bigYears;
    for (let j = 0; j < numberOfLogsToDo; ++j) {
      transformedUnits = Math.log10(transformedUnits);
    }
  } else {
    if (event.yearsNumber < 1) {
      transformedUnits = 0;
    } else {
      transformedUnits = Math.log10(Math.log10(event.yearsNumber));
    }
  }
  event.freq = transformedUnits * freqPerTransformedUnit + bottomFreq;
  if (isNaN(event.freq)) {
    event.freq = 1;
  }
  event = Object.assign(event, {
    freqPerTransformedUnit,
    bottomFreq,
    transformedUnits
  });
  // The frequency derivation explanation can be formatted this way
  //event.freqDerivation = `The frequency is derived with this function: log<subscript>10</subscript>log<subscript>10</subscript>${event.yearsNumber}(k) + f<subscript>0</subscript>, where k = ${freqPerTransformedUnit} and f<subscript>0</subscript> = ${bottomFreq}.`;

  return event;
}
