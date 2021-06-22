var d3 = require('d3-selection');
require('d3-transition');
var { drag } = require('d3-drag');
var throttle = require('lodash.throttle');

function Autoscroller({
  secondsPerCompactUnit,
  ticksPerCompactUnit,
  heightUnitsPerTick,
  scrollToEventDuration,
  containerSelector,
  rootSelector,
  ticker,
}) {
  const timeoutLength = (secondsPerCompactUnit / ticksPerCompactUnit) * 1000;
  var throttledJumpTo = throttle(jumpTo, 100);
  var root = d3.select(rootSelector);
  var zoomRoot = root.select('.zoom-root');
  var addDrag = drag();
  addDrag.on('start', onDragStart);
  addDrag.on('end', onDragEnd);
  addDrag.on('drag', onDrag);
  d3.select(containerSelector).call(addDrag);
  var dragging = false;
  var queuedScrollTicksValue = -1;
  var active = true;

  window.onfocus = setActive;
  window.onblur = setInactive;

  return { scroll };

  function scroll(ticks) {
    if (dragging) {
      return;
    }
    if (active) {
      zoomRoot
        .transition()
        .duration(scrollToEventDuration)
        .attr(
          'transform',
          `translate(0, ${(ticks - 0.5) * heightUnitsPerTick})`
        );
      return;
    }

    queuedScrollTicksValue = ticks;
    console.log(
      'Inactive so queuing to scroll to this later',
      queuedScrollTicksValue
    );
  }

  function jumpTo(y) {
    zoomRoot.attr('transform', `translate(0, ${y})`);
    ticker.setTicks(y / heightUnitsPerTick);
  }

  function onDragStart() {
    dragging = true;
    ticker.pause();
  }

  function onDragEnd() {
    dragging = false;
    // Wait a while before restarting ticker.
    setTimeout(() => ticker.resume(), timeoutLength * 4);
  }

  function onDrag() {
    const y = translateYFromSel(zoomRoot) + d3.event.dy;
    throttledJumpTo(y);
  }

  //function reportPosition() {
  //const ticks = getTicksFromPosition();
  //onScroll({
  //ticks,
  //positionInCompactUnits: ticks / ticksPerCompactUnit,
  //});
  //}

  //function getTicksFromPosition() {
  // TODO: Don't get it from the position.
  // In fact, instead, set the position from the ticks,
  // unless dragging is happening.
  //const y = translateYFromSel(zoomRoot);
  //return y / heightUnitsPerTick + 0.5;
  //}

  function setActive() {
    active = true;
    if (queuedScrollTicksValue > -1) {
      console.log('Now active, scrolling to', queuedScrollTicksValue);
      scroll(queuedScrollTicksValue);
      queuedScrollTicksValue = -1;
    }
  }

  function setInactive() {
    active = false;
  }
}

function translateYFromSel(sel) {
  var transformString = sel.attr('transform');

  if (!transformString) {
    return 0;
  }

  return +transformString.split(',')[1].split(')')[0];
}

module.exports = Autoscroller;
