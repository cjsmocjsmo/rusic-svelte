import { writable } from 'svelte/store';
import { 
    isPlaying, 
    currentPlayingImg, 
    currentPlayingArtist, 
    currentPlayingSong } from './stores.js';

export const progress = writable(0);

let index = 0;
let progressInterval;
let audio;
if (typeof window !== 'undefined') {
    audio = new Audio();
}
let srclist = [];

async function loadCoverArt(src) {
    const URL = "http://192.168.0.74:8080/coverartfromplaypath/" + src
    const url = encodeURI(URL)
    const response = await fetch(url);
    const data = await response.json();
    currentPlayingArtist.set(data[0]);
    currentPlayingSong.set(data[1]);
    currentPlayingImg.set(data[2]);
}

async function loadSingle(src) {
    const URL = "http://192.168.0.74:8080/coverartfromplaypath/" + src
    const url = encodeURI(URL)
    const response = await fetch(url);
    const data = await response.json();
    currentPlayingArtist.set(data[0]);
    currentPlayingSong.set(data[1]);
}

function loadTrack(src) {
    audio.src = src;
    audio.load();
}

function play(audio) {
    loadCoverArt(srclist[index]);
    audio.src = srclist[index];
    audio.load();
    audio.play();
    audio.onplay = function () {
        isPlaying.set(true);
        progressInterval = setInterval(() => {
            progress.set((audio.currentTime / audio.duration) * 100);
        }, 1000);
    };
    audio.onpause = function () {
        isPlaying.set(false);
        clearInterval(progressInterval);
    };
    audio.onended = function () {
        isPlaying.set(false);
        progress.set(0);
        clearInterval(progressInterval);
        playNext();
    };
}

export function playsingle(src) {
    loadSingle(src);
    audio.src = src;
    audio.load();
    audio.play();
    audio.onplay = function () {
        isPlaying.set(true);
        progressInterval = setInterval(() => {
            progress.set((audio.currentTime / audio.duration) * 100);
        }, 1000);
    };
    audio.onpause = function () {
        isPlaying.set(false);
        clearInterval(progressInterval);
    };
    audio.onended = function () {
        isPlaying.set(false);
        progress.set(0);
        // clearInterval(progressInterval);
    };
}

function playNext() {
    if (index < srclist.length) {
        const path = srclist[index];
        loadTrack(path);
        play(audio);
        index++;
    } else if (index >= srclist.length) {
        index = 0;
        const path = srclist[index];
        loadTrack(path);
        play(audio);
        index++;
    }
}

function playPrevious() {
    if (index > 0) {
        const path = srclist[index];
        loadTrack(path);
        play(audio);
        index--;
    } else if (index <= 0) {
        index = srclist.length - 1;
        const path = srclist[index];
        loadTrack(path);
        play(audio);
        index--;
    }
}

function stop(audio) {
    isPlaying.set(false);
    audio.pause();
    audio.src = "";
    audio.currentTime = 0;
    progress.set(0);
    clearInterval(progressInterval);
    index = 0;
}



export function playplist(list) {
    srclist = list;
    index = 0;
    playNext();
}

export function next(srclist) {
    playNext();
}

export function previous(srclist) {
    playPrevious();
}

export function stopPlayback() {
    stop(audio);
}