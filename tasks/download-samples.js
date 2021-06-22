var { queue } = require('d3-queue');
var request = require('basic-browser-request');
var bodyMover = require('request-body-mover');
var oknok = require('oknok');

function downloadSamples({ ctx, sampleFiles, baseURL }, allDone) {
  var q = queue();
  sampleFiles.forEach(queueDownload);
  q.awaitAll(downloadsDone);

  function queueDownload(file) {
    q.defer(downloadSample, file);
  }

  function downloadSample(file, done) {
    request(
      { method: 'GET', binary: true, url: `${baseURL}/${file}` },
      bodyMover(oknok({ ok: decode, nok: done }))
    );

    function decode(buffer) {
      ctx.decodeAudioData(buffer, passDecoded);
    }

    function passDecoded(decoded) {
      done(null, decoded);
    }
  }

  function downloadsDone(error, buffers) {
    if (error) {
      allDone(error);
      return;
    }
    allDone(null, buffers);
  }
}

module.exports = downloadSamples;
