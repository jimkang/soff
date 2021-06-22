var d3 = require('d3-selection');
var modRange1ReverseDict = require('../reverse-eased-dict');

const {
  midCompactTimeToMod,
  minCompactTimeToMod,
  maxCompactTimeToMod,
  modRange1,
  modRange2,
  desiredModRange2,
  heightUnitsPerTick,
  ticksPerCompactUnit,
} = require('../consts');

const circleMoveDuration = 300;
const emphasizedTickWidth = 20;

const minCompactOut = 4;
const midCompactOut =
  minCompactTimeToMod +
  ((midCompactTimeToMod - 4) / (midCompactTimeToMod - 4 + 0.25)) * modRange1;
const maxCompactOut =
  midCompactTimeToMod +
  ((maxCompactTimeToMod - midCompactTimeToMod) / modRange2) * desiredModRange2;

//const locale = new Intl.NumberFormat().resolvedOptions().locale;
var yearsFormatter = new Intl.NumberFormat({
  localeMatch: 'best fit',
  style: 'decimal',
  useGrouping: true,
  maximumFractionDigits: 2,
});

var board = d3.select('#board');
var circleSel = board.select('.now-circle');
var ticksRoot = board.select('.ticks-root');

function emphasizeTick({ ticks }) {
  const yearsText = getYearsText(ticks / ticksPerCompactUnit);
  d3.select('#years-notice').html(
    yearsText === '1'
      ? `${yearsText} year has passed.`
      : `${yearsText} years have passed.`
  );

  const currentTickY = ticks * -heightUnitsPerTick;
  //console.log('circle y', currentTickY);
  circleSel.transition().duration(circleMoveDuration).attr('cy', currentTickY);

  var currentTick = ticksRoot.select('.current');
  if (currentTick.empty()) {
    currentTick = ticksRoot
      .append('line')
      .classed('current', true)
      .classed('tick', true);
    currentTick
      .attr('x1', -emphasizedTickWidth / 2)
      .attr('x2', emphasizedTickWidth / 2);
  }

  currentTick.attr('y1', currentTickY);
  currentTick.attr('y2', currentTickY);
}

// Trying to reverse what's in tools/add-eased-time.
function getYearsText(timeInCompactUnits) {
  var years;
  var uneased;

  if (timeInCompactUnits < minCompactOut) {
    uneased = timeInCompactUnits;
  } else if (
    timeInCompactUnits >= minCompactOut &&
    timeInCompactUnits <= midCompactOut
  ) {
    let key = ~~timeInCompactUnits;
    while (key > 0) {
      if (key in modRange1ReverseDict) {
        uneased = modRange1ReverseDict[key];
        break;
      }
      key--;
    }
  } else if (
    timeInCompactUnits > midCompactOut &&
    timeInCompactUnits <= maxCompactOut
  ) {
    // Undo linear shortening.
    uneased =
      ((timeInCompactUnits - midCompactTimeToMod) / desiredModRange2) *
        modRange2 +
      midCompactTimeToMod;
  } else {
    uneased = timeInCompactUnits;
  }

  if (uneased < 9) {
    const yearsNumber = ~~Math.pow(10, uneased);
    if (isNaN(yearsNumber) || yearsNumber === Infinity) {
      years = '???';
    } else {
      years = yearsFormatter.format(yearsNumber);
    }
  } else {
    years = `10<sup>${yearsFormatter.format(uneased)}</sup>`;
  }
  return years;
}

module.exports = emphasizeTick;
