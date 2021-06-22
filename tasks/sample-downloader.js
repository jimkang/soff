var downloadSamples = require('./download-samples');
var handleError = require('handle-error-web');
var oknok = require('oknok');
var ContextKeeper = require('audio-context-singleton');

const cdnSampleBaseURL =
  'https://smidgeo.nyc3.cdn.digitaloceanspaces.com/sound-of-the-far-future/samples';
const localSampleBaseURL = 'samples';

var { getCurrentContext } = ContextKeeper();

function SampleDownloader({ sampleFiles, localMode }) {
  var downloadStatus = {
    samplesDownloaded: false,
    sampleBuffers: null,
  };

  return { downloadStatus, startDownloads };

  function startDownloads() {
    getCurrentContext(oknok({ ok: useContext, nok: handleError }));
  }

  function useContext(ctx) {
    downloadSamples(
      {
        ctx,
        sampleFiles,
        baseURL: localMode ? localSampleBaseURL : cdnSampleBaseURL,
      },
      oknok({ ok: saveBuffers, nok: handleError })
    );
  }

  function saveBuffers(buffers) {
    downloadStatus.sampleBuffers = buffers;
    downloadStatus.samplesDownloaded = true;
  }
}

module.exports = SampleDownloader;
