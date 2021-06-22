var downloadSamples = require('./download-samples');
var handleError = require('handle-error-web');
var oknok = require('oknok');
var ContextKeeper = require('audio-context-singleton');

var { getCurrentContext } = ContextKeeper();

// Optimized for forward movement througth idList.
function SampleCacher({ cacheSize = 5, baseURL, ext = '', idList }) {
  var buffersForFiles = {};
  var filesDownloaded = [];
  var nextIndex = 0;

  return { getSample, loadSamples, loadNext };

  function getSample(id, done) {
    const file = id + ext;
    var buffer = buffersForFiles[file];
    if (buffer) {
      //console.log('Cache hit', id);
      Promise.resolve().then(() => done(null, buffer));
      return;
    }

    //console.log(
    //'Cache miss',
    //id,
    //'cache contents',
    //Object.keys(buffersForFiles)
    //);
    loadSamples(
      [id],
      oknok({ ok: () => done(null, buffersForFiles[file]), nok: done })
    );
  }

  function loadSamples(ids, done) {
    var files = ids.map((id) => id + ext);
    for (var j = files.length - 1; j > -1; --j) {
      if (buffersForFiles[files[j]]) {
        files.splice(j, 1);
      }
    }

    getCurrentContext(oknok({ ok: useContext, nok: handleError }));

    function useContext(ctx) {
      downloadSamples(
        { ctx, sampleFiles: files, baseURL },
        oknok({ ok: saveBuffers, nok: done })
      );
    }

    function saveBuffers(buffers) {
      if (buffers.length < files.length) {
        done(new Error(`Missing buffers from download of ${ids.join(', ')}.`));
        return;
      }

      for (var i = 0; i < buffers.length; ++i) {
        const file = files[i];
        buffersForFiles[file] = buffers[i];
        filesDownloaded.push(file);
      }
      while (filesDownloaded.length > cacheSize && filesDownloaded.length > 0) {
        delete buffersForFiles[filesDownloaded[0]];
        filesDownloaded.shift();
      }

      updateNextIndex();
      //console.log(
      //'Saved buffers; new cache contents',
      //Object.keys(buffersForFiles)
      //);

      done(null, buffers);
    }
  }
  function loadNext(n, done) {
    loadSamples(
      idList.slice(nextIndex, nextIndex + n),
      oknok({ ok: incrementNextIndex, nok: done })
    );

    function incrementNextIndex() {
      nextIndex += n;
      if (nextIndex >= idList.length) {
        nextIndex = nextIndex - idList.length;
      }
      done();
    }
  }

  function updateNextIndex() {
    var ids = filesDownloaded.map((file) => file.slice(0, -ext.length));

    for (var j = 0; j < ids.length; ++j) {
      const id = ids[j];
      const index = idList.indexOf(id);
      if (index > nextIndex) {
        nextIndex = index + 1;
        if (nextIndex >= idList.length) {
          nextIndex = 0;
        }
      }
    }
  }
}

module.exports = SampleCacher;
