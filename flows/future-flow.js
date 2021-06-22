var playTickSynth = require('../synths/tick-synth');
var playEventSynth = require('../synths/event-synth');
var playSample = require('../synths/play-sample');
var mixRiffPair = require('./mix-riff-pair');
var oknok = require('oknok');
var ContextKeeper = require('audio-context-singleton');
var handleError = require('handle-error-web');
var renderTimeline = require('../dom/render-timeline');
var renderDescription = require('../dom/render-description');
var renderTicks = require('../dom/render-ticks');
var Probable = require('probable').createProbable;
var seedrandom = require('seedrandom');
var Scroller = require('../dom/scroller');
var curry = require('lodash.curry');
var emphasizeTick = require('../dom/emphasize-tick');
var Ticker = require('./ticker');
var riffParts = require('./riff-parts');
var wireTransportControls = require('./dom/wire-transport-controls');
var ep = require('errorback-promise');

var speechPlaying = false;
var lastEventPlayTick = -10;

const {
  scrollToEventDuration,
  heightUnitsPerTick,
  secondsPerCompactUnit,
  ticksPerCompactUnit,
  totalTicks,
  speechOverlapSeconds,
  baseSpeechVol,
  minVibratoTickLength,
  ticksWherePanUnhinges,
  concurrentRiffCountsForCategories,
  maxConcurrentRiffs,
  minTicksBetweenEventPlays,
} = require('../consts');

var { getCurrentContext } = ContextKeeper();

// Warning: Not really reentrant-friendly.
function futureFlow({
  timeline,
  seed,
  startTicks,
  stopTicks,
  muteVocals,
  muteTicks,
  muteHorns,
  pauseOnEndMovement,
  tickSampleDownloader,
  eventSampleDownloader,
  narrationSampleCacher,
}) {
  var ticker = Ticker({
    onTick,
    secondsPerCompactUnit,
    ticksPerCompactUnit,
    startTicks,
    onPause,
    onResume,
  });
  var scroller = Scroller({
    secondsPerCompactUnit,
    ticksPerCompactUnit,
    heightUnitsPerTick,
    scrollToEventDuration,
    containerSelector: '#board',
    rootSelector: '#board .timeline-root-container',
    ticker,
  });
  var probable = Probable({ random: seedrandom(seed) });
  var riffPairs = [];
  for (var i = 0; i < maxConcurrentRiffs; ++i) {
    riffPairs.push(mixRiffPair(probable, riffParts[i]));
  }
  //console.log(riffPairs);

  // TODO: Update years passed more often.
  renderTimeline({
    eventData: timeline,
    // We need one less "line segment" than there are ticks.
    // e.g. If there were 3 ticks, we'd need 2 line segments to connect them.
    ticksTicked:
      timeline[timeline.length - 1].easedStartTime * ticksPerCompactUnit - 1,
  });

  var renderTransportControls = wireTransportControls({
    onPausePlayToggle,
    onSkipBackClick,
    onSkipForwardClick,
  });

  ticker.resume();

  function onTick(ticks) {
    const positionInCompactUnits = ticks / ticksPerCompactUnit;
    //console.log(positionInCompactUnits);
    playTick(~~ticks);
    runCloseEvents(positionInCompactUnits, ticks);
    if (ticks === +stopTicks) {
      setTimeout(ticker.pause, 0);
    }

    requestAnimationFrame(() => {
      scroller.scroll(ticks);
      renderTicks({ ticksTicked: ticks });
      emphasizeTick({
        ticks,
      });
      renderTransportControls({
        currentlyPlaying: true,
        skipForwardEnabled: shouldEnableSkipForward(ticks),
      });
    });
  }

  function runCloseEvents(currentTimeInCompactUnits, ticks) {
    if (Math.abs(ticks - lastEventPlayTick) < minTicksBetweenEventPlays) {
      //console.log(
      //'Skipping event because',
      //ticks,
      //'is too close to',
      //lastEventPlayTick
      //);
      return;
    }

    var closeEvents = timeline.filter(
      curry(timeIsCloseToEvent)(currentTimeInCompactUnits)
    );
    if (closeEvents.length > 0) {
      //console.log(
      //currentTimeInCompactUnits,
      //closeEvents.map((e) => e.id)
      //);
      requestAnimationFrame(() => runEvent(closeEvents));
    }

    function runEvent(closeEvents) {
      if (closeEvents.length < 1) {
        return;
      }

      getCurrentContext(oknok({ ok: useContext, nok: handleError }));

      function useContext(ctx) {
        // Skip the sound for the first one.
        if (closeEvents[0].yearsFromNow !== 0) {
          let synthOpts = {
            ctx,
            probable,
            events: probable.sample(closeEvents, 1),
            envelopeMaxGain: 0.85,
            delaySeconds: 0,
            sampleDownloader: eventSampleDownloader,
            muteHorns,
          };
          playEventSynth(synthOpts);

          recordEventTickPlay(closeEvents[0]);
          lastEventPlayTick = ticks;

          if (pauseOnEndMovement && closeEvents.some((e) => e.endMovement)) {
            setTimeout(
              () => ticker.pause(),
              ticker.getCurrentTickLength() * 1000 * 16
            );
          }

          // Extra ones for the end.
          if (closeEvents.some((e) => e.isEnd)) {
            playEventSynth(Object.assign(synthOpts, { delaySeconds: 15 }));
            playEventSynth(Object.assign(synthOpts, { delaySeconds: 30 }));
          }
        }
        speakAndShowEvents(closeEvents);
      }
    }
  }

  function playTick(ticksTicked) {
    const timeWobbleRange = getWobbleRange(ticksTicked);

    getCurrentContext(oknok({ ok: useContext, nok: handleError }));

    function useContext(ctx) {
      var panA = -1 + getPanAdjustment(ticksTicked);
      var panB = 1 - getPanAdjustment(ticksTicked);
      //console.log(panA, panB);
      var category = 'earth';
      var mostRecentEvent = getMostRecentEvent(timeline, ticksTicked).event;
      if (mostRecentEvent) {
        category = mostRecentEvent.category;
      }
      const concurrentRiffCount = concurrentRiffCountsForCategories[category];

      for (var i = 0; i < concurrentRiffCount; ++i) {
        let timeWobbleSeconds = 0;
        if (
          ticksTicked % concurrentRiffCount !== 0 &&
          probable.roll(100) / 100 < timeWobbleRange
        ) {
          timeWobbleSeconds =
            (probable.roll(timeWobbleRange * 100) / 100) *
            ticker.getCurrentTickLength();
        }
        let delaySeconds = timeWobbleSeconds;
        if (category !== 'universe') {
          delaySeconds +=
            (i / concurrentRiffCount) * ticker.getCurrentTickLength();
        }
        var tickSynthOpts = {
          ticksTicked,
          probable,
          ctx,
          delaySeconds,
          sampleDownloader: tickSampleDownloader,
          // We need to avoid triggering garbage collection when
          // things get fast, so turn off vibrato then.
          vibratoOn: ticker.getCurrentTickLength() > minVibratoTickLength,
        };

        if (muteTicks && ticksTicked > 0) {
          continue;
        }

        playTickSynth(
          Object.assign({ riff: riffPairs[i][0], pan: panA }, tickSynthOpts)
        );
        playTickSynth(
          Object.assign({ riff: riffPairs[i][1], pan: panB }, tickSynthOpts)
        );
      }
    }
  }

  function getPanAdjustment(ticksTicked) {
    const variance = Math.max((ticksTicked - 32) / ticksWherePanUnhinges, 0);
    return Math.min(probable.roll(variance * 200) / 200, 2);
  }

  // Returns a number from 0 to 1.0.
  function getWobbleRange(ticksTicked) {
    return ticksTicked / totalTicks;
  }

  function speakAndShowEvents(events) {
    if (events.some((e) => e.isEnd)) {
      ticker.pause();
      localStorage.finalEventReached = true;
    }
    // Wait a little bit for the sound to play first.
    var shuffled = probable.shuffle(events);
    for (var i = 0; i < shuffled.length; ++i) {
      let event = shuffled[i];
      setTimeout(
        () => speakAndShowEvent({ event, volumeAdj: -0.05 * i }),
        ticker.getCurrentTickLength() * 1000 * (2 + i)
      );
    }
  }

  function speakAndShowEvent({ event, volumeAdj = 0 }) {
    if (!speechPlaying) {
      if (!muteVocals) {
        playNarration(event);
      }
      renderDescription({ event });
    }

    async function playNarration(event) {
      speechPlaying = true;
      var sampleRes = await ep(narrationSampleCacher.getSample, event.id);
      if (sampleRes.error) {
        handleError(sampleRes.error);
        speechPlaying = false;
        return;
      }

      var sampleBuffer = sampleRes.values[0];
      if (!sampleBuffer) {
        console.error(new Error(`No sampleBuffer downloaded for ${event.id}.`));
        speechPlaying = false;
        return;
      }

      var ctxRes = await ep(getCurrentContext);

      if (ctxRes.error) {
        handleError(ctxRes.error);
        speechPlaying = false;
        return;
      }

      const speechLengthSeconds = sampleBuffer.length / sampleBuffer.sampleRate;

      // There could be other speech playing, but this will still cover
      // enough cases.
      setTimeout(() => {
        speechPlaying = false;
      }, (speechLengthSeconds - speechOverlapSeconds) * 1000);

      narrationSampleCacher.loadNext(1, handleError);

      const progProportion = ticker.getTicks() / totalTicks;
      let feedbackDelayEffect = {
        feedbackSeconds: progProportion * 0.4,
        delaySeconds: progProportion * 0.6,
      };

      playSample({
        ctx: ctxRes.values[0],
        sampleBuffer,
        event,
        probable,
        volume: baseSpeechVol + volumeAdj,
        soundDurationSeconds: speechLengthSeconds,
        feedbackDelayEffect: event.isEnd ? null : feedbackDelayEffect,
      });
    }
  }

  function onPausePlayToggle() {
    if (ticker.isPaused()) {
      ticker.resume();
    } else {
      ticker.pause();
    }
  }

  function onPause() {
    renderTransportControls({
      currentlyPlaying: false,
      skipForwardEnabled: shouldEnableSkipForward(ticker.getTicks()),
    });
  }

  function onResume() {
    renderTransportControls({
      currentlyPlaying: true,
      skipForwardEnabled: shouldEnableSkipForward(ticker.getTicks()),
    });
  }

  function onSkipBackClick() {
    ticker.setTicks(
      getMostRecentPastEventTick(timeline, ticker.getTicks()) - 1
    );
    renderTransportControlsAfterATick();
  }

  function onSkipForwardClick() {
    const nextEventTick = getClosestFutureEventTick(
      timeline,
      ticker.getTicks()
    );
    if (!isNaN(nextEventTick)) {
      ticker.setTicks(nextEventTick - 1);
      renderTransportControlsAfterATick();
    }
  }

  function renderTransportControlsAfterATick() {
    setTimeout(
      () =>
        renderTransportControls({
          currentlyPlaying: !ticker.isPaused(),
          skipForwardEnabled: shouldEnableSkipForward(ticker.getTicks()),
        }),
      ticker.getCurrentTickLength()
    );
  }
}

// Don't check for distance in both directions, or you'll play the event both coming toward it and going away from it.
function timeIsCloseToEvent(timeInCompactUnits, event) {
  const diff = event.easedStartTime - timeInCompactUnits;
  return diff <= 1 / ticksPerCompactUnit && diff >= 0;
}

function getMostRecentPastEventTick(timeline, ticks) {
  var { event } = getMostRecentEvent(timeline, ticks);

  if (!event) {
    return 0;
  }

  return event.easedStartTime * ticksPerCompactUnit;
}

function getMostRecentEvent(timeline, ticks) {
  const compactUnits = ticks / ticksPerCompactUnit;
  for (var i = timeline.length - 1; i > -1; --i) {
    let event = timeline[i];
    if (compactUnits >= event.easedStartTime) {
      return { event, index: i };
    }
  }
  return { event: null, index: -1 };
}

function getClosestFutureEventTick(timeline, ticks) {
  // When we skip forward, we skip to one before the next event.
  // Just in case we just did that, look ahead by two ticks
  // so that the most recent event is the one we're almost at.
  const { index } = getMostRecentEvent(timeline, ticks + 2);
  const nextIndex = index + 1;
  if (nextIndex >= timeline.length) {
    return;
  }

  var nextEvent = timeline[nextIndex];
  return nextEvent.easedStartTime * ticksPerCompactUnit;
}

function recordEventTickPlay(event) {
  const eventTick = event.easedStartTime * ticksPerCompactUnit;
  if (
    !localStorage.futuremostEventTickPlayed ||
    eventTick > localStorage.futuremostEventTickPlayed
  ) {
    localStorage.futuremostEventTickPlayed = eventTick;
  }
}

function shouldEnableSkipForward(ticks) {
  const futuremostEventTickPlayed = +localStorage.futuremostEventTickPlayed;
  return futuremostEventTickPlayed && futuremostEventTickPlayed > ticks + 1;
}

module.exports = futureFlow;
