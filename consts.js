var eventsList = require('./timeline-of-the-far-future');

const scrollToEventDuration = 500;
const heightUnitsPerTick = 20;
const secondsPerCompactUnit = 16;
const ticksPerCompactUnit = 16;
const lowestCompactUnit = eventsList[0].easedStartTime;
const highestCompactUnit = eventsList[eventsList.length - 1].easedStartTime;
const highestRawCompactUnit =
  eventsList[eventsList.length - 1].startTimeInCompactUnits;
const compactUnitRange = highestCompactUnit - lowestCompactUnit;
const secondsPerTick = secondsPerCompactUnit / ticksPerCompactUnit;
const totalTicks = highestCompactUnit * ticksPerCompactUnit;
const speechOverlapSeconds = 1.2;
const baseSpeechVol = 0.45;

const maxCompactTimeToMod = highestRawCompactUnit;
const pieceLengthInHours = 2;
const desiredEasedMax = (3600 * pieceLengthInHours) / secondsPerCompactUnit;
const midCompactTimeToMod = 100;
const minCompactTimeToMod = eventsList.find(
  (e) => e.startTimeInCompactUnits > 0
).startTimeInCompactUnits;
const modRange1 = midCompactTimeToMod - minCompactTimeToMod;
const modRange2 = maxCompactTimeToMod - midCompactTimeToMod;
const desiredModRange2 = desiredEasedMax - midCompactTimeToMod;
const bigTempoWaveAmp = 0.15;
const minVibratoTickLength = 0.8;

// At about 60 bpm, the 16-beat riff takes up about a
// quarter of a minute.
const ticksWherePanUnhinges = 16 * 4 * 16;
const maxConcurrentRiffs = 4;

const minTicksBetweenEventPlays = 2;

var concurrentRiffCountsForCategories = {
  earth: 1,
  solar: 1,
  galaxy: 2,
  universe: 3,
  physics: maxConcurrentRiffs,
};

const maxDistIndex = 11;

var intervals = [
  2, // octave
  1.5, // fifth
  4 / 3, // fourth
  1.25, // major third
  6 / 5, // minor third
  9 / 8, // major second
  16 / 9, // minor seventh
  27 / 16, // major sixth
  128 / 81, // minor sixth
  243 / 128, // major seventh
  256 / 243, // minor second
  729 / 512, // tritone!
];

module.exports = {
  scrollToEventDuration,
  heightUnitsPerTick,
  secondsPerCompactUnit,
  ticksPerCompactUnit,
  highestCompactUnit,
  highestRawCompactUnit,
  lowestCompactUnit,
  compactUnitRange,
  secondsPerTick,
  totalTicks,
  speechOverlapSeconds,
  baseSpeechVol,
  desiredEasedMax,
  midCompactTimeToMod,
  minCompactTimeToMod,
  maxCompactTimeToMod,
  modRange1,
  modRange2,
  desiredModRange2,
  bigTempoWaveAmp,
  minVibratoTickLength,
  ticksWherePanUnhinges,
  concurrentRiffCountsForCategories,
  maxConcurrentRiffs,
  maxDistIndex,
  intervals,
  minTicksBetweenEventPlays,
};
