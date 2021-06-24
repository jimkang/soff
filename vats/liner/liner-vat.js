var RouteState = require('route-state');
var wireControls = require('./dom/wire-controls');
var futureFlow = require('./flows/future-flow');
var handleError = require('handle-error-web');
var timeline = require('./timeline-of-the-far-future');
var SampleDownloader = require('./tasks/sample-downloader');
var SampleCacher = require('./tasks/sample-cacher');
var tickSampleFiles = require('./tasks/sample-files');
var ContextKeeper = require('audio-context-singleton');
var ep = require('errorback-promise');
var { version } = require('./package.json');

const localNarrationBaseURL = 'narration';
const cdnNarrationBaseURL =
  'https://smidgeo.nyc3.cdn.digitaloceanspaces.com/sound-of-the-far-future/narration';

var { getCurrentContext } = ContextKeeper();
var randomid = require('@jimkang/randomid')();
var outerContainerEl = document.querySelector('.outer-container');
var yesWebaudioEl = document.querySelector('.yes-webaudio-intro');
var noWebaudioEl = document.querySelector('.no-webaudio-intro');

var routeState;
var controlsWired = false;

(async function go() {
  window.onerror = reportTopLevelError;
  renderVersion();

  routeState = RouteState({
    followRoute,
    windowObject: window,
    propsToCoerceToBool: [
      'muteVocals',
      'muteTicks',
      'muteHorns',
      'pauseOnEndMovement',
      'localMode',
    ],
  });

  // Check web audio support level.
  var { error, values } = await ep(getCurrentContext);
  // Mobile Safari 14.4 doesn't have createStereoPanner.
  if (error || !values[0] || !values[0].createStereoPanner) {
    yesWebaudioEl.classList.add('hidden');
    noWebaudioEl.classList.remove('hidden');
  } else {
    routeState.routeFromHash();
  }
})();

function followRoute({
  seed,
  startTicks,
  stopTicks,
  muteVocals,
  muteTicks,
  muteHorns,
  pauseOnEndMovement,
  localMode,
}) {
  if (!seed) {
    seed = randomid(8);
    routeState.updateEphemeralState({ seed }, false);
  }
  console.log('Seed:', seed);

  if (controlsWired) {
    onStart();
  } else {
    wireControls({ onStart });
    controlsWired = true;
  }

  var tickSampleDownloader = SampleDownloader({
    localMode,
    sampleFiles: tickSampleFiles,
  });
  var eventSampleDownloader = SampleDownloader({
    localMode,
    sampleFiles: ['horns-sus-ff-e2-PB-loop.mp3'],
  });
  const narrationBaseURL = localMode
    ? localNarrationBaseURL
    : cdnNarrationBaseURL;

  var narrationSampleCacher = SampleCacher({
    baseURL: narrationBaseURL,
    ext: '.mp3',
    idList: timeline.map((e) => e.id),
  });

  tickSampleDownloader.startDownloads();
  eventSampleDownloader.startDownloads();
  narrationSampleCacher.loadNext(5, handleError);

  function onStart() {
    outerContainerEl.classList.remove('hidden');

    futureFlow({
      timeline,
      seed,
      startTicks: +startTicks,
      stopTicks: +stopTicks,
      muteVocals,
      muteTicks,
      muteHorns,
      pauseOnEndMovement,
      localMode,
      tickSampleDownloader,
      eventSampleDownloader,
      narrationSampleCacher,
    });
  }
}

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}

function renderVersion() {
  var versionInfo = document.getElementById('version-info');
  versionInfo.textContent = version;
}
