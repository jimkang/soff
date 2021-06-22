#!/bin/bash

#root=samples
root=samples/vibraphone
cd $root || exit

for file in *.wav

do
    basename="${file%.*}"
    lame "${basename}.wav" "${basename}.mp3"
done
