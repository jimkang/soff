var d3 = require('d3-selection');
require('d3-transition');

var description = d3.select('#description-container .description');
var timeSel = description.select('.time');
var textSel = description.select('.description-text');

function renderDescription({ event }) {
  if (!event) {
    return;
  }

  timeSel.html(event.yearsFromNow);
  textSel.html(event.skimmableContent);
}

module.exports = renderDescription;
