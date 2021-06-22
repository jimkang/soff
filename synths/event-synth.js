var playSynth = require('./synth');
const {
  secondsPerTick,
  lowestCompactUnit,
  compactUnitRange,
  ticksPerCompactUnit,
  maxDistIndex,
  intervals,
} = require('../consts');

const reverbWet = 0.9;
const reverbDry = 0.1;
const timeNeededForEnvelopeDecay = 1; // Making this too large makes things silent?
const minimumTicksBetweenNewReverb = 20 / secondsPerTick;

var lastEventTick = 0;

function playEventSynth(opts) {
  if (!opts.sampleDownloader.downloadStatus.samplesDownloaded) {
    console.error(new Error('Event sample not downloaded yet!'));
    return;
  }

  playEventWithSamples(opts);
}

function playEventWithSamples({
  ctx,
  events,
  envelopeMaxGain,
  delaySeconds = 0,
  probable,
  sampleDownloader,
  muteHorns,
}) {
  // Big assumption: events given are close to each other in time, so
  // the first one can be used as a proxy for the rest in some matters.
  var firstEvent = events[0];
  const currentTick = firstEvent.easedStartTime * ticksPerCompactUnit;

  const soundDurationSeconds = Math.max(
    firstEvent.isEnd ? 32.0 : 4.0,
    0.5 * Math.max(Math.log(firstEvent.startTimeInCompactUnits))
  ); // Intentionally not log10 here.

  const envelopeDecayRateK = firstEvent.isEnd
    ? 0
    : Math.max(
      (firstEvent.startTimeInCompactUnits - lowestCompactUnit) /
          compactUnitRange,
      0.2
    );

  const distanceIndex = distanceIndexForCompactUnits(
    firstEvent.easedStartTime,
    lowestCompactUnit,
    compactUnitRange
  );
  //console.log('distanceIndex', distanceIndex);

  var detuneAmounts = [0];
  for (let i = 1; i < maxDistIndex - distanceIndex; ++i) {
    detuneAmounts.push(pickDetuneAmount(maxDistIndex - distanceIndex, i, i));
  }
  //console.log('detuneAmounts', detuneAmounts);

  var samplerKits = detuneAmounts.map((sampleDetune) => ({
    sampleBuffer: sampleDownloader.downloadStatus.sampleBuffers[0],
    sampleDetune,
  }));

  const reverbSeconds = distanceIndex * 2.5;
  //console.log('currentTick', currentTick, 'lastEventTick', lastEventTick);

  // If muteHorns is true, why bother going so far into this function or
  // calling it at all? Because we still want to make our probable 'rolls' here
  // so that all the proceeding rolls with this seed turn out the same
  // whether horns are muted or not.
  if (!muteHorns) {
    playSynth({
      ctx,
      envelopeOn: true,
      envelopeMaxGain:
        samplerKits.length > 0
          ? envelopeMaxGain / samplerKits.length + 0.05
          : envelopeMaxGain,
      envelopePeakRateK: 0.5,
      envelopeDecayRateK,
      timeNeededForEnvelopeDecay,
      useCachedReverb:
        currentTick - lastEventTick <= minimumTicksBetweenNewReverb,
      reverbOn: true,
      reverbSeconds,
      reverbWet,
      reverbDry,
      samplerOn: true,
      samplerKits,
      soundDurationSeconds,
      delaySeconds,
    });
  }

  lastEventTick = currentTick;

  function pickDetuneAmount(varianceLevel, chordIndex) {
    const interval = intervals[Math.min(chordIndex, intervals.length - 1)];
    const octave = probable.roll(varianceLevel / 2);
    const cents = (octave + interval - 1) * 1200;

    return cents;
  }
}

// Goes higher the further in the future the unit is,
// but more quickly earlier on.
function distanceIndexForCompactUnits(
  units,
  lowestCompactUnit,
  compactUnitRange
) {
  const proportion = (units - lowestCompactUnit) / compactUnitRange;
  return Math.max(~~(Math.pow(proportion, 0.1) * maxDistIndex), 0.01);
}

module.exports = playEventSynth;
