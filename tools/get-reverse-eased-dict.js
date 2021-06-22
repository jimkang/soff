var { minCompactTimeToMod, modRange1 } = require('../consts');
var { range } = require('d3-array');

function ease(x) {
  const proportion = (x - minCompactTimeToMod) / modRange1;
  return minCompactTimeToMod + (proportion / (proportion + 0.25)) * modRange1;
}

var dict = {};
range(4, 100, 0.25).forEach((x) => (dict[~~ease(x)] = x));

console.log(JSON.stringify(dict, null, 2));
