var { range } = require('d3-array');
var { select } = require('d3-selection');
var accessor = require('accessor');
const { heightUnitsPerTick } = require('../consts');

const baseTickWidth = 10;
const pageHeight = document.body.getBoundingClientRect().height;

// Intended to be called every time there is a new tick.
function renderTicks({ ticksTicked }) {
  var ticksRoot = select('.ticks-root');
  const maxVisibleTicks = pageHeight / heightUnitsPerTick + 1;
  var tickData = range(
    Math.round(Math.max(ticksTicked - maxVisibleTicks, 0)),
    ticksTicked
  );

  var ticks = ticksRoot.selectAll('.tick').data(tickData, accessor('identity'));
  ticks.exit().remove();
  var newTicks = ticks.enter().append('line').classed('tick', true);

  var survivingTicks = newTicks.merge(ticks);
  survivingTicks
    .attr('y1', getTickY)
    .attr('y2', getTickY)
    .attr('x1', -baseTickWidth / 2)
    .attr('x2', baseTickWidth / 2);
  //console.log('latest tick Y', getTickY(ticksTicked));

  function getTickY(currentTickCount) {
    // Go up, as the ticks go up.
    return currentTickCount * -heightUnitsPerTick;
  }
}

module.exports = renderTicks;
