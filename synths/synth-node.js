var seedrandom = require('seedrandom');
var SoundbankReverb = require('soundbank-reverb');

class SynthNode {
  constructor(ctx, params) {
    this.ctx = ctx;
    this.params = params;
    this.node = null;
  }
  node() {
    return this.node;
  }
  connect({ synthNode, audioNode }) {
    if (audioNode) {
      this.node.connect(audioNode);
    } else if (synthNode) {
      this.node.connect(synthNode.node);
    } else {
      throw new Error('No synthNode or raw AudioNode passed to connect.');
    }
  }
  play({ startTime, endTime }) {
    try {
      this.node.start(startTime);
      if (!isNaN(endTime)) {
        this.node.stop(endTime);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

class VibratoGenerator extends SynthNode {
  constructor(ctx, params) {
    super(ctx, params);
    this.node = this.ctx.createOscillator();
    this.node.frequency.value = this.params.rateFreq;
  }
}

class VibratoAmp extends SynthNode {
  constructor(ctx, params) {
    super(ctx, params);
    this.node = this.ctx.createGain();
    this.node.gain.value = this.params.pitchVariance;
  }
  connect({ synthNode, audioNode }) {
    var connectTargetNode = audioNode || synthNode.node;
    var connectTarget = connectTargetNode[this.params.destProp || 'detune'];
    this.node.connect(connectTarget);
  }
  play() {}
}

class Carrier extends SynthNode {
  constructor(ctx, params) {
    super(ctx, params);
    this.node = this.ctx.createOscillator();
    if (
      this.params.carrierWaveType === 'custom' &&
      this.params.carrierCustomWaveArrayLength &&
      this.params.carrierCustomWaveSeed
    ) {
      this.node.setPeriodicWave(
        getCustomWave({
          carrierCustomWaveArrayLength: this.params
            .carrierCustomWaveArrayLength,
          carrierCustomWaveSeed: this.params.carrierCustomWaveSeed,
          ctx: this.ctx,
        })
      );
    } else {
      this.node.type = this.params.carrierWaveType;
      this.node.frequency.value = this.params.carrierFreq;
    }
  }
}

class Gain extends SynthNode {
  constructor(ctx, params) {
    super(ctx, params);
    this.node = this.ctx.createGain();
    this.node.gain.value = this.params.gain;
  }
  play() {}
}

class Envelope extends SynthNode {
  constructor(ctx, params) {
    super(ctx, params);
    this.node = this.ctx.createGain();
  }
  play({ startTime, endTime }) {
    this.node.gain.value = 0;
    this.node.gain.setTargetAtTime(
      this.params.envelopeMaxGain,
      startTime,
      this.params.envelopePeakRateK
    );
    this.node.gain.setTargetAtTime(
      0,
      Math.max(endTime - this.params.timeNeededForEnvelopeDecay, startTime),
      this.params.envelopeDecayRateK
    );
  }
}

class Reverb extends SynthNode {
  constructor(ctx, params) {
    super(ctx, params);
    this.node = this.ctx.createGain();
    this.node = SoundbankReverb(ctx);
    this.node.time = this.params.reverbSeconds;
    this.node.wet.value = this.params.reverbWet;
    this.node.dry.value = this.params.reverbDry;
  }
  play() {}
}

class Compressor extends SynthNode {
  constructor(ctx, params) {
    super(ctx, params);
    this.node = ctx.createDynamicsCompressor();
  }
  play({ startTime }) {
    this.node.threshold.setValueAtTime(
      this.params.compressorThreshold,
      startTime
    );
    this.node.knee.setValueAtTime(this.params.compressorKnee, startTime);
    this.node.ratio.setValueAtTime(this.params.compressorRatio, startTime);
    this.node.attack.setValueAtTime(this.params.compressorAttack, startTime);
    this.node.release.setValueAtTime(this.params.compressorRelease, startTime);
  }
}

class Sampler extends SynthNode {
  constructor(ctx, params) {
    super(ctx, params);
    this.node = ctx.createBufferSource();
    this.node.buffer = params.sampleBuffer;
    if (params.sampleDetune) {
      this.node.detune.value = params.sampleDetune;
    }
  }
  play({ startTime, endTime }) {
    this.node.start(startTime);
    this.node.stop(endTime + this.params.timeNeededForEnvelopeDecay);
  }
}

function getCustomWave({
  carrierCustomWaveArrayLength,
  carrierCustomWaveSeed,
  ctx,
}) {
  var random = seedrandom(carrierCustomWaveSeed);
  var real = new Float32Array(carrierCustomWaveArrayLength);
  var imaginary = new Float32Array(carrierCustomWaveArrayLength);
  real[0] = 0;
  imaginary[0] = 0;
  for (var i = 1; i < carrierCustomWaveArrayLength; ++i) {
    real[i] = -1.0 + random() * 2;
    imaginary[i] = -1.0 + random() * 2;
  }
  //console.log('real', real, 'imaginary', imaginary);
  return ctx.createPeriodicWave(real, imaginary);
}

module.exports = {
  Carrier,
  VibratoGenerator,
  VibratoAmp,
  Envelope,
  Reverb,
  Compressor,
  Sampler,
  Gain,
};
