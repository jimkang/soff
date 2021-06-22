/* global process, __dirname, Buffer */
var fs = require('fs');
var minimist = require('minimist');
var queue = require('d3-queue').queue;
var waterfall = require('async-waterfall');
var bodyMover = require('request-body-mover');
var request = require('request');
var curry = require('lodash.curry');
var config = require('../config');

const endpointURL = 'https://texttospeech.googleapis.com/v1/text:synthesize';

var includeOnlyList = [
  //'event-iCSD',
  //'event-voru',
  //'event-EBME',
  //'event-kKdb',
  //'event-qvJH',
  //'event-MAMN',
  //'event-pBcr',
  //'event-bctp',
  //'event-NvcN',
  //'event-bLKw',
  //'event-jUfN',
  //'event-Wehh',
  //'event-LDTC',
  //'event-aQad',
  //'event-PwTi',
  //'event-yuPb',
  //'event-qQoQ',
  //'event-WLEC',
  //'event-TdMg',
  'event-DciZ'
];

var { src, outDir } = minimist(process.argv.slice(2));

if (!src || !outDir) {
  console.log(
    `Usage: node tools/get-speech-for-events.js
      --src <path to JSON with events>
      --outDir <directory where audio files should be written>`
  );
  process.exit();
}

var events = JSON.parse(fs.readFileSync(__dirname + '/../' + src));
if (includeOnlyList) {
  events = events.filter((event) => includeOnlyList.includes(event.id));
}

var q = queue();
events.forEach(queueAudioRender);
q.awaitAll(handleError);

function queueAudioRender(entry) {
  q.defer(renderAudio, entry);
}

function handleError(error) {
  if (error) {
    console.error(error, error.stack);
  }
}

function renderAudio({ id, skimmableContent, speakableContent }, done) {
  const text = speakableContent || skimmableContent;

  if (text) {
    waterfall([curry(callTTS)(text), curry(saveAudio)(id)], audioRenderingDone);
  } else {
    // TODO: Handle audioURLs
    console.error('Produced nothing for', id);
    process.nextTick(done);
  }

  function audioRenderingDone(error) {
    // Don't stop the music, even if there is an error.
    handleError(error);
    done();
  }
}

function callTTS(text, done) {
  var reqOpts = {
    method: 'POST',
    json: true,
    url: endpointURL + '?key=' + config.ttsAPIKey,
    body: {
      input: { text },
      voice: { languageCode: 'en-US', name: 'en-US-Wavenet-C' },
      audioConfig: { audioEncoding: 'MP3', speakingRate: 1.0 },
    },
  };
  request(reqOpts, bodyMover(done));
}

function saveAudio(id, apiResult, done) {
  const path = `${__dirname}/../${outDir}/${id}.mp3`;
  fs.writeFile(
    path,
    Buffer.from(apiResult.audioContent, 'base64'),
    { encoding: null },
    done
  );
}
