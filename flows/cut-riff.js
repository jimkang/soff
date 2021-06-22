var sampleFiles = require('../tasks/sample-files');
var { range } = require('d3-array');
var cloneDeep = require('lodash.clonedeep');
var getAtPath = require('get-at-path');

var noteNames = [
  'A',
  'Bb',
  'B',
  'C',
  'Db',
  'D',
  'Eb',
  'E',
  'F',
  'Gb',
  'G',
  'Ab',
];

const startOctave = 3;
const startPitchIndex = 5; // Gb

var pIndexes = {};

(function fillIndexes() {
  for (let octave = startOctave; ; octave += 1) {
    pIndexes[octave] = {};

    for (
      let octaveIndex = octave === startOctave ? startPitchIndex : 0;
      octaveIndex < 12;
      octaveIndex += 1
    ) {
      const sampleIndex =
        (octave - startOctave) * 12 + octaveIndex - startPitchIndex;
      if (sampleIndex >= sampleFiles.length) {
        return;
      }
      pIndexes[octave][noteNames[octaveIndex]] = sampleIndex;
    }
  }
})();

//console.log(pIndexes);

function getBaseRiff(
  riffParts,
  probable,
  numberOfNotesToAlter,
  isOKToGoOutsideRiffPitches,
  riffVolAdj = 1
) {
  var origParts = riffParts.map((part) =>
    part.split(',').map(parsePitchString)
  );
  var parts = cloneDeep(origParts);
  if (numberOfNotesToAlter > 0) {
    let alterIndexes = probable
      .shuffle(range(16))
      .slice(0, numberOfNotesToAlter);
    for (let i = 0; i < alterIndexes.length; ++i) {
      const alterIndex = alterIndexes[i];
      const partIndex = ~~(alterIndex / 4);
      const noteIndex = alterIndex % 4;
      if (isOKToGoOutsideRiffPitches) {
        const octave = +parts[partIndex][noteIndex][0] + probable.roll(3) - 1;
        const note = probable.pick(noteNames);
        if (getAtPath(pIndexes, [octave, note])) {
          parts[partIndex][noteIndex][0] = octave;
          parts[partIndex][noteIndex][1] = note;
        }
      } else {
        parts[partIndex][noteIndex] =
          origParts[probable.roll(4)][probable.roll(4)];
      }
    }
  }
  var pitchPairs = parts.flat();
  const noteCount = pitchPairs.length;

  const emphasisMeter = probable.roll(Math.min(numberOfNotesToAlter, 7));
  const emphasisBeat =
    probable.roll(3) === 0 ? 0 : probable.roll(emphasisMeter);
  const volRange =
    (probable.roll(numberOfNotesToAlter) / noteCount / 2) * 0.03 + 0.03;
  const softest = 0.03;
  const loudest = volRange + softest;

  // A non-zero start vol makes the vibraphone "ticky".
  const makeItTicky =
    probable.roll(numberOfNotesToAlter) / 8 > probable.roll(noteCount);

  return pitchPairs.map(noteFromPitchPair);

  function noteFromPitchPair(octavePitch, i) {
    let midVol =
      ((probable.roll(numberOfNotesToAlter) / noteCount) * 0.5 + 0.5) *
        volRange +
      softest;
    if (emphasisMeter > 0 && i % emphasisMeter === emphasisBeat) {
      midVol += ((probable.roll(50) + 50) / 100) * (loudest - midVol);
    }
    midVol *= riffVolAdj;

    return {
      pitchIndex: pIndexes[octavePitch[0]][octavePitch[1]],
      startVol: makeItTicky ? midVol : 0,
      midVol: makeItTicky ? 0 : midVol,
    };
  }
}

function parsePitchString(s) {
  return [s.slice(-1), s.slice(0, -1)];
}

function cutRiff({
  riffParts,
  length,
  probable,
  numberOfNotesToAlter,
  isOKToGoOutsideRiffPitches,
  riffVolAdj,
}) {
  var baseRiff = getBaseRiff(
    riffParts,
    probable,
    numberOfNotesToAlter,
    isOKToGoOutsideRiffPitches,
    riffVolAdj
  );

  if (baseRiff.length >= length) {
    return baseRiff.slice(0, length);
  }

  var riff = [];
  for (var i = 0; i < ~~(length / baseRiff.length); ++i) {
    riff = riff.concat(baseRiff);
  }
  riff = riff.concat(baseRiff.slice(0, length % baseRiff.length));
  return riff;
}

module.exports = cutRiff;
