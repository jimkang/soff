const timeNeededForEnvelopeDecay = 2;
const envelopePeakRate = 0.01;
const envelopeDecayRate = 0.99;
const vibratoRateFreq = 165;
const vibratoPitchVariance = 10;
const durationSeconds = 1.0;

function playTickSynth({
  ticksTicked,
  riff,
  pan,
  ctx,
  delaySeconds = 0,
  vibratoOn,
  sampleDownloader,
}) {
  if (!sampleDownloader.downloadStatus.samplesDownloaded) {
    console.error(new Error('Samples not downloaded yet!'));
    return;
  }

  const riffIndex = ticksTicked % riff.length;
  const note = riff[riffIndex];
  //console.log('midVol', note.midVol);

  var buffer = sampleDownloader.downloadStatus.sampleBuffers[note.pitchIndex];

  var player = ctx.createBufferSource();
  player.buffer = buffer;

  var vibrato;
  if (vibratoOn) {
    vibrato = getVibrato({
      rateFreq: vibratoRateFreq,
      pitchVariance: vibratoPitchVariance,
      ctx,
    });
  }

  var envelope = ctx.createGain();

  var panner = ctx.createStereoPanner();
  panner.pan.value = pan;

  if (vibratoOn) {
    vibrato.amp.connect(player.detune);
  }
  player.connect(envelope);
  envelope.connect(panner);
  panner.connect(ctx.destination);

  const startTime = ctx.currentTime + delaySeconds;
  const stopTime = startTime + durationSeconds;
  envelope.gain.value = note.startVol;
  envelope.gain.setTargetAtTime(note.midVol, startTime, envelopePeakRate);
  envelope.gain.setTargetAtTime(0, stopTime, envelopeDecayRate);
  player.start(startTime);
  player.stop(stopTime + timeNeededForEnvelopeDecay);
  if (vibratoOn) {
    vibrato.generator.start(startTime);
    vibrato.generator.stop(stopTime + timeNeededForEnvelopeDecay);
  }
}

function getVibrato({ rateFreq, pitchVariance, ctx }) {
  var generator = ctx.createOscillator();
  generator.frequency.value = rateFreq;
  var amp = ctx.createGain();
  amp.gain.value = pitchVariance;
  generator.connect(amp);
  return { generator, amp };
}

module.exports = playTickSynth;
