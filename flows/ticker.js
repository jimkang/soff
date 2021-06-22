const { totalTicks, bigTempoWaveAmp } = require('../consts');

function Ticker({
  onTick,
  secondsPerCompactUnit,
  ticksPerCompactUnit,
  startTicks,
  onPause,
  onResume,
}) {
  var ticks = 0;
  if (!isNaN(startTicks) && startTicks > -1) {
    ticks = startTicks;
  }

  var timeoutKey;
  var currentTickLength = 1;

  return {
    getTicks,
    setTicks,
    pause,
    resume,
    isPaused,
    getCurrentTickLength,
  };

  function getTicks() {
    return ticks;
  }

  function setTicks(val) {
    ticks = Math.round(val);
    onTick(ticks);
  }

  function pause() {
    clearTimeout(timeoutKey);
    timeoutKey = null;
    if (onPause) {
      onPause();
    }
  }

  function resume() {
    if (!timeoutKey) {
      tick();
    }
    if (onResume) {
      onResume();
    }
  }

  function tick() {
    onTick(ticks);
    ticks += 1;
    const progress = ticks / totalTicks;
    var factor = 1;
    if (progress > 0.175) {
      const bigWaveY =
        bigTempoWaveAmp * Math.cos(2.5 * Math.PI * (progress - 0.2)) +
        1 -
        bigTempoWaveAmp;
      const smallWaveY =
        (1 / (20 * progress)) *
        Math.cos(((2 * Math.PI * 40) / progress) * (progress - 0.2));
      factor = bigWaveY + smallWaveY;
      //console.log(ticks, 'factor', factor);
    }
    currentTickLength = (secondsPerCompactUnit / ticksPerCompactUnit) * factor;
    timeoutKey = setTimeout(tick, currentTickLength * 1000);
  }

  function isPaused() {
    return !timeoutKey;
  }

  function getCurrentTickLength() {
    return currentTickLength;
  }
}

module.exports = Ticker;
