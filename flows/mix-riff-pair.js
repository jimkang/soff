var cutRiff = require('./cut-riff');

function mixRiffPair(probable, riffPartSpec) {
  var baseRiffLength = 4;
  var cutBaseOpts = {
    riffParts: riffPartSpec,
    probable,
    numberOfNotesToAlter: 0,
    isOKToGoOutsideRiffPitches: false,
  };

  var riffABase = cutRiff(
    Object.assign({ length: baseRiffLength }, cutBaseOpts)
  );
  var riffBBase = cutRiff(
    Object.assign({ length: baseRiffLength + 1 }, cutBaseOpts)
  );

  var riffA = [];
  var riffB = [];

  for (let i = 0; i < 48; ++i) {
    riffA = riffA.concat(riffABase);
    riffB = riffB.concat(riffBBase);
  }

  for (let i = 0; i < 16; ++i) {
    baseRiffLength += 1;
    const riffVolAdj = getRiffVolAdj(i / 16);
    //let variantA = probable.shuffle(riffABase);
    //let variantB = probable.shuffle(riffBBase);

    for (let j = 0; j < 24; ++j) {
      if (j % 4 === 0) {
        riffA = riffA.concat(riffABase);
        riffB = riffB.concat(riffBBase);
      } else {
        let variantA = cutRiff({
          riffParts: riffPartSpec,
          length: baseRiffLength,
          probable,
          numberOfNotesToAlter: ~~(i / 2),
          isOKToGoOutsideRiffPitches: probable.roll(i) > 12,
          riffVolAdj,
        });
        let variantB = cutRiff({
          riffParts: riffPartSpec,
          length: baseRiffLength + 1,
          probable,
          numberOfNotesToAlter: ~~(i / 2),
          isOKToGoOutsideRiffPitches: probable.roll(i) > 12,
          riffVolAdj,
        });
        if (probable.roll(2) === 0) {
          riffA = riffA.concat(variantA);
          riffB = riffB.concat(variantB);
        } else {
          riffA = riffA.concat(variantB);
          riffB = riffB.concat(variantA);
        }
      }
    }
  }
  //console.log(riffA.map((n) => n.midVol));
  //console.log(riffB.map((n) => n.midVol));
  return [riffA, riffB];
}

// x should be between 0 and 1.
function getRiffVolAdj(x) {
  if (x <= 0.2) {
    return 1;
  }

  return (1 / 3) * Math.cos(2.5 * 2 * Math.PI * (x - 0.2)) + 2 / 3;
}

module.exports = mixRiffPair;
