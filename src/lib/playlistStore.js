import { writable } from 'svelte/store';

export const playlist = writable([]);

export const songsforplaylist = writable([]);

// export const addsongtoplaylistsongid = writable('');

export const selectedplaylistid = writable('');

export const selectedplaylistname = writable('Select A Playlist');

export const playlistplaysongids = writable([]);

export const addbuttonvisible = writable(false);

async function AddSongToPlaylist(selectedpaylistid, songid) {
    let url = 'http://10.0.4.31:8080/addsongtoplaylist/' + selectedpaylistid + '/' + (songid);
    URL = encodeURI(url);
    let response = await fetch(URL)
        .then((response) => response.json())
        .then((data) => {
        })
        .catch((error) => {
            console.error('Error:', error);
        }
        );
}

export function addsongtoplaylist(songid) {
    AddSongToPlaylist(songid);
}