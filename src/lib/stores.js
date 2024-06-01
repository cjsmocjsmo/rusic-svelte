import { writable } from 'svelte/store';
import MainImg from '$lib/images/playing.jpg'

export const currentPlayingImg = writable(MainImg);

export const currentPlayingSong = writable('');

export const currentPlayingArtist = writable('');

export const albumForArtistArtistId = writable('');

export const albumForArtistAlbumId = writable('');

export const songsForAlbum = writable('');

export const isPlaying = writable(false)