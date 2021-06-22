require('d3-transition');
var d3 = require('d3-selection');
var accessor = require('accessor');
const { heightUnitsPerTick, ticksPerCompactUnit } = require('../consts');

const timeLabelHeight = 100;
const labelAppearDuration = 400;
var board = d3.select('#board');

// Intended to be called one time.
function renderTimeline({ eventData, ticksTicked }) {
  var containerRoot = board.select('.timeline-root-container');
  var timelineRoot = containerRoot.select('.timeline-root');
  renderLabels({ eventData, heightUnitsPerTick });

  const lineLength = ticksTicked * heightUnitsPerTick;
  board.select('.time-line').attr('y2', -lineLength);

  function renderLabels({ eventData, heightUnitsPerTick }) {
    var events = timelineRoot.selectAll('.event').data(eventData, accessor());
    events.exit().remove();
    var newEvents = events
      .enter()
      .append('g')
      .attr('id', accessor())
      .attr('opacity', 0)
      .classed('event', true);
    var newContainers = newEvents
      .append('foreignObject')
      .attr('width', 100)
      .attr('x', -50)
      // Never forget: Using the namespace when appending an html
      // element to a foreignObject is incredibly important. Without it,
      // a div will not size itself correctly for its contents.
      .append('xhtml:div')
      .classed('event-container', true);
    newContainers
      .append('xhtml:div')
      .classed('time', true)
      .classed('shadowed', true);
    newContainers
      .append('xhtml:div')
      .classed('subtitle', true)
      .text('years from now');

    var survivingEvents = newEvents.merge(events);
    survivingEvents.select('foreignObject').attr('height', timeLabelHeight);
    survivingEvents.select('.time').html(accessor('yearsFromNow'));
    survivingEvents
      .attr('transform', getEventTransform)
      .transition()
      .duration(labelAppearDuration)
      .attr('opacity', getEventLabelOpacity);

    function getEventTransform({ easedStartTime }) {
      // Ascend away from earth: Later events are higher.
      return `translate(0, ${
        easedStartTime * ticksPerCompactUnit * -heightUnitsPerTick
      })`;
    }

    function getEventLabelOpacity(event, index, eventEls) {
      if (index >= eventEls.length - 1) {
        return 1;
      }
      var nextEventEls = eventEls.slice(index + 1, index + 3);
      if (nextEventEls.some(closeInCompactUnits)) {
        return 0;
      }

      return 1.0;

      function closeInCompactUnits(nextEventEl) {
        return (
          nextEventEl.__data__.easedStartTime - event.easedStartTime <= 0.5
        );
      }
    }
  }
}

module.exports = renderTimeline;
