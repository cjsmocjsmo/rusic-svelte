import { writable } from 'svelte/store';
import {
	isPlaying,
	currentPlayingImg,
	currentPlayingArtist,
	currentPlayingSong
} from './stores.js';

export const progress = writable(0);

let index = 0;
let progressInterval;
let audio;
if (typeof window !== 'undefined') {
	audio = new Audio();
}
let srclist = [];

async function loadSingle(src) {
    console.log('loadSingle() called with src:', src);
    const URL = "http://10.0.4.76:8080/coverartfromplaypath/" + src
    const url = encodeURI(URL)
	console.log("endocded url ", url)
    const response = await fetch(url);
    const data = await response.json();
    currentPlayingArtist.set(data[0]);
    currentPlayingSong.set(data[1]);
}

// Backend sometimes serializes string fields as {String, Valid} (e.g. Go sql.NullString) instead of a plain string.
function resolveStringField(value) {
	if (typeof value === 'string') return value;
	if (value && typeof value === 'object' && 'String' in value) {
		return value.Valid === false ? '' : value.String;
	}
	return '';
}

function play(track) {
	const artist = resolveStringField(track.Artist);
	const song = resolveStringField(track.Song);
	const imgUrl = resolveStringField(track.ImgUrl);
	const playPath = resolveStringField(track.PlayPath);

	if (!playPath) {
		console.error('play(): track has no usable PlayPath, skipping playback. Raw track:', track);
		return;
	}

	currentPlayingArtist.set(artist);
	currentPlayingSong.set(song);
	currentPlayingImg.set(imgUrl);
	audio.src = playPath;
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
		const track = srclist[index];
		play(track);
		index++;
	} else if (index >= srclist.length) {
		index = 0;
		const track = srclist[index];
		play(track);
		index++;
	}
}

function playPrevious() {
	if (index > 0) {
		const track = srclist[index];
		play(track);
		index--;
	} else if (index <= 0) {
		index = srclist.length - 1;
		const track = srclist[index];
		play(track);
		index--;
	}
}

function stop(audio) {
	isPlaying.set(false);
	audio.pause();
	audio.src = '';
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

export function next() {
	playNext();
}

export function previous() {
	playPrevious();
}

export function stopPlayback() {
	stop(audio);
}
