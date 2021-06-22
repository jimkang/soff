var {
  Carrier,
  VibratoGenerator,
  VibratoAmp,
  Envelope,
  Reverb,
  Compressor,
  Sampler,
  Gain,
} = require('./synth-node');

var cachedReverb;

// samplerOn is mutually exclusive with vibratoOn and modOn.
function playSynth({
  modOn = false,
  modIndex,
  modFreq,
  carrierOn = false,
  carrierWaveType,
  carrierFreq,
  carrierCustomWaveArrayLength,
  carrierCustomWaveSeed,
  envelopeOn = false,
  envelopeMaxGain = 0.3,
  envelopePeakRateK,
  envelopeDecayRateK,
  timeNeededForEnvelopeDecay = 1, // TODO: Expose in UI
  vibratoOn = false,
  vibratoRateHz,
  vibratoPitchVarCents,
  delaySeconds = 0,
  soundDurationSeconds,
  reverbOn = false,
  reverbSeconds,
  reverbWet,
  reverbDry,
  useCachedReverb = true,
  compressorOn = false,
  compressorThreshold = -50,
  compressorKnee = 40,
  compressorRatio = 12,
  compressorAttack = 0,
  compressorRelease = 0.25,
  samplerOn = false,
  samplerKits = [], // Containing sampleBuffer and sampleDetune
  gainOn = false,
  gain = 1,
  ctx,
  addToChain,
}) {
  //console.log('useCachedReverb', useCachedReverb);
  var activeSynths = [];
  setUpSynthChain();
  if (addToChain) {
    addToChain(activeSynths);
  }
  play();

  function setUpSynthChain() {
    if (samplerOn) {
      activeSynths.push(
        samplerKits.map(
          (kit) =>
            new Sampler(ctx, {
              sampleBuffer: kit.sampleBuffer,
              sampleDetune: kit.sampleDetune,
              timeNeededForEnvelopeDecay,
            })
        )
      );
    } else {
      if (vibratoOn) {
        activeSynths.push(
          new VibratoGenerator(ctx, { rateFreq: vibratoRateHz })
        );

        activeSynths.push(
          new VibratoAmp(ctx, { pitchVariance: vibratoPitchVarCents })
        );
      }

      if (modOn) {
        const deviation = modIndex * modFreq;
        activeSynths.push(new VibratoGenerator(ctx, { rateFreq: modFreq }));
        activeSynths.push(
          new VibratoAmp(ctx, {
            pitchVariance: deviation,
            destProp: 'frequency',
          })
        );
      }
    }

    if (carrierOn) {
      activeSynths.push(
        new Carrier(ctx, {
          carrierFreq,
          carrierWaveType,
          carrierCustomWaveArrayLength,
          carrierCustomWaveSeed,
        })
      );
    }

    if (gainOn) {
      activeSynths.push(new Gain(ctx, { gain }));
    }

    if (envelopeOn) {
      activeSynths.push(
        new Envelope(ctx, {
          envelopeMaxGain,
          envelopePeakRateK,
          envelopeDecayRateK,
          timeNeededForEnvelopeDecay,
        })
      );
    }

    if (reverbOn) {
      // HACK: Creating new Reverb every time there's a new event makes it to
      // a lot of calculating to figure out what to give to the convolver node,
      // which causes stutters. This hack depends on us only using one context.
      if (!useCachedReverb || !cachedReverb) {
        cachedReverb = new Reverb(ctx, { reverbSeconds, reverbWet, reverbDry });
      }
      activeSynths.push(cachedReverb);
    }

    if (compressorOn) {
      activeSynths.push(
        new Compressor(ctx, {
          compressorThreshold,
          compressorKnee,
          compressorRatio,
          compressorAttack,
          compressorRelease,
        })
      );
    }

    // All of this assumes that every node only connects
    // to one other node.
    for (var i = 0; i < activeSynths.length; ++i) {
      let synth = activeSynths[i];
      let nextSynth;
      let isEnd = i + 1 === activeSynths.length;
      if (isEnd) {
        if (Array.isArray(synth)) {
          synth.forEach((singleSynth) =>
            singleSynth.connect({ audioNode: ctx.destination })
          );
        } else {
          synth.connect({ audioNode: ctx.destination });
        }
      } else {
        nextSynth = activeSynths[i + 1];
        if (Array.isArray(synth)) {
          synth.forEach((singleSynth) =>
            connectToNextSynthOrSynths(singleSynth, nextSynth)
          );
        } else {
          connectToNextSynthOrSynths(synth, nextSynth);
        }
      }
    }
    //activeSynths[activeSynths.length - 1].connect({
    //audioNode: ctx.destination,
    //});
  }

  function play() {
    const startTime = ctx.currentTime + delaySeconds;
    const endTime = startTime + +soundDurationSeconds;

    activeSynths.forEach(playNodeOrGroup);

    function playNodeOrGroup(nodeOrGroup) {
      if (Array.isArray(nodeOrGroup)) {
        nodeOrGroup.forEach((node) => node.play({ startTime, endTime }));
      } else {
        nodeOrGroup.play({ startTime, endTime });
      }
    }
  }
}

function connectToNextSynthOrSynths(src, dest) {
  if (Array.isArray(dest)) {
    dest.forEach((destSynth) => src.connect({ synthNode: destSynth }));
  } else {
    src.connect({ synthNode: dest });
  }
}

module.exports = playSynth;
