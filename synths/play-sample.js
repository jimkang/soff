var playSynth = require('./synth');
var AddFeedbackDelay = require('./add-feedback-delay');

function playSample({
  ctx,
  delaySeconds = 0,
  sampleBuffer,
  //event,
  soundDurationSeconds,
  volume,
  feedbackDelayEffect,
}) {
  var samplerKits = [{ sampleBuffer, sampleDetune: 0 }];

  playSynth({
    ctx,
    envelopeOn: false,
    reverbOn: false,
    samplerOn: true,
    gainOn: true,
    samplerKits,
    delaySeconds,
    timeNeededForEnvelopeDecay: 1,
    soundDurationSeconds,
    gain: volume,
    addToChain: feedbackDelayEffect
      ? AddFeedbackDelay({ ctx, feedbackDelayEffect })
      : undefined,
  });
}

module.exports = playSample;
