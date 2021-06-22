# Sound of the Far Future

[Hear it live.](https://jimkang.com/sound-of-the-far-future/)

[Get the album.](https://jimkang.bandcamp.com/album/the-sound-of-the-far-future)

This is a browser-performed piece of ambient music. It is a musical interpretation of the scientific predictions described in the Wikipedia article [The Timeline of the Far Future](https://en.wikipedia.org/wiki/Timeline_of_the_far_future). It is also a data sonification that presents the events of the far future, which span 10<sup>10<sup>10<sup>56</sup></sup></sup> years within a few hours to give the listener a sense of the scale and relationship between these events.

Events are represented by horn clusters and speech. The passage of years is represented by vibraphone riffs that are improvised each performance. The riffs become more entropic over time, and their performance becomes wilder. (This came from Laurie Spigel's [writing about information theory in composition](http://retiary.org/ls/writings/info_theory_music.html).)

## Getting it running

Once you have this source code on your computer, you can get it running by doing the following.

- Install [Node 10 or later](https://nodejs.org/).
- From the root directory of the project (the same one this README file is in), run this command: `npm i`
- Then, run `make run`. It should then say something like `Your application is ready~! Local: http://0.0.0.0:7000`
  - On Windows, you may not have `make`. In that case, you can run `npm run dev`.
  - Go to `http://0.0.0.0:7000` (or `http://localhost:7000`) in your browser. The web app will be running there.
    - By default, the web app downloads the sample files from a CDN. If you want it to be able to run on your computer without an internet connection, go to `http://localhost:7000#localMode=yes` to tell it to grab the sample from your computer instead of the CDN.

## Structure

### app.js

This is the entry point of the app. It decides how it should behave based on the "route" given to it in the url hash (the stuff after the `#` in the url), then connects code to respond to user actions to UI elements and starts `futureFlow`.

### /flows

This directory that contains code that has the coordination logic for the piece.

- future-flow.js is the top-level coordinator that sets up the ticker and code that responds to the ticker. It makes decisions about what to play at each tick by consulting the riffs and the current point in the piece.
- ticker.js is responsible for timing. It metes out the "ticks" (which vary in length) and accepts calls to pause or continue the piece.
- mix-riff-pair.js and cut-riff.js generate the riffs to be used for the session.

### /synths

This directory contains code for producing sounds.

- synth-node.js defines wrappers for AudioNodes. It sets AudioNodes up with certain params and connects them to an audio graph when asked.
- synth.js provides a playSynth function which strings together an audio graph described by the many possible options passed to it, then plays it.

The rest of the modules in this directory use playSynth to make specific sounds for ticks, events, and vocals.

### /tasks

This directory contains files for performing tasks. In actuality, all of the tasks here are about downloading audio files at the right time so that they can be used in the piece.

### /dom

These are modules that have to do with receiving input from and rendering to the DOM, largely with the aid of D3. Scrolling to stay in sync with the ticks as well as reporting that the user has dragged the timeline with the intent to go forward and back in time is handled in scroller.js.

### timeline-of-the-far-future.json

This JSON file has objects representing select events documented in the fantastic [Timeline of the Far Future](https://en.wikipedia.org/wiki/Timeline_of_the_far_future) Wikipedia article.

### consts.js

This module contains constants shared throughout the app.

### /tools

These are tools for building various parts of the app.

- get-speech-events.js gets text-to-speech audio of the events listed in timeline-of-the-far-future.json.
  - To use this, you will need to create a `config.js` file in the root directory of the project (the same one this README file is in) that has these contents: `module.exports = { ttsAPIKey: 'your-api-key' };`
    - `your-api-key` should be the API key you get from [Google's text-to-speech service](https://cloud.google.com/text-to-speech/). (As of 2021/06/21, [the first million characters you convert to speech are free](https://cloud.google.com/text-to-speech/pricing), but you do have to give them a credit card number.)
- add-compacted-time transforms the years value in the event objects in timeline-of-the-far-future.json into startTimeInCompactUnits, which is something smaller. In most cases, it is the log10 of the years value, but there are special cases in which things are crunched down further to make the piece complete in a reasonable amount of time (in about a day).
- add-eased-time.js transforms the startTimeInCompactUnits values into easedStartTime valuse so that 1) they are further crunched down so that the piece would complete in two hours if every tick took 16 seconds (that's not the case, but on average, it's close) and 2) events that are really close together are spread apart some. easedStartTime is what is actually used by the app at runtime for scheduling.

# License

[PolyForm Noncommercial License 1.0.0](license.txt)

Copyright (c) 2019 Jim Kang
