var StrokeRouter = require('strokerouter');
var { select } = require('d3-selection');

var docStrokeRouter = StrokeRouter(document);
var OLPE = require('one-listener-per-element');
var pausePlaySel = select('#pause-play-button');
var pauseIcon = pausePlaySel.select('.pause-icon');
var playIcon = pausePlaySel.select('.play-icon');
var skipForwardSel = select('#skip-forward-button');

var { on } = OLPE();

function wireTransportControls({
  onPausePlayToggle,
  onSkipBackClick,
  onSkipForwardClick,
}) {
  docStrokeRouter.unrouteKeyUp('space', null);
  docStrokeRouter.routeKeyUp('space', null, onPausePlayToggle);
  on('#pause-play-button', 'click', onPausePlayToggle);
  on('#skip-back-button', 'click', onSkipBackClick);
  on('#skip-forward-button', 'click', onSkipForwardClick);

  return renderTransportControls;

  function renderTransportControls({ currentlyPlaying, skipForwardEnabled }) {
    pauseIcon.classed('hidden', !currentlyPlaying);
    playIcon.classed('hidden', currentlyPlaying);
    skipForwardSel.classed('invisible', !skipForwardEnabled);
  }
}

module.exports = wireTransportControls;
