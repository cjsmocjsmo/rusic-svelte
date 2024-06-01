import { writable } from 'svelte/store';

export const currentPlayingImg = writable('http://192.168.0.74:8080/assets/playing2.jpg');

export const currentPlayingSong = writable('');

export const currentPlayingArtist = writable('');

export const albumForArtistArtistId = writable('');

export const albumForArtistAlbumId = writable('');

export const songsForAlbum = writable('');

export const isPlaying = writable(false)