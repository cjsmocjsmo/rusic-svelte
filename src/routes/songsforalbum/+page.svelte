<script>
	import { onMount } from 'svelte';
	import { songsForAlbum, currentPlayingImg } from '$lib/stores.js';
	import { selectedplaylistid, addbuttonvisible } from '$lib/playlistStore.js';
	import { playsingle } from '$lib/sound2Store.js';
	import PlaylistSelect from '$lib/Comps/playlistselect.svelte';

	let SFA = $songsForAlbum;

	let songlist = [];
	onMount(async () => {
		let URL = 'http://192.168.0.74:8080/albumsforartistsongs/' + $songsForAlbum;
		try {
			const response = await fetch(URL)
				.then((response) => response.json())
				.then((data) => {
					songlist = data;
				});
		} catch (error) {
			console.error(error);
		}
	});


	function playSong(src, albid) {
		getCurrentPlayingImg(albid);
		playsingle(src);
	}

	function setPlayingImg(img) {
		currentPlayingImg.set(img);
	}
	
	async function getCurrentPlayingImg(albid) {
		try {
			const response = await fetch('http://192.168.0.74:8080/currentPlayingImg/' + albid)
				.then((response) => response.json())
				.then((data) => {
					setPlayingImg(data.HttpThumbPath);
				});
		} catch (error) {
			console.error(error);
		}
	}

	async function addSongToPlaylist(songid) {
		const u = 'http://192.168.0.74:8080/addsongtoplaylist';
		const ur = u + '/' + $selectedplaylistid;
		const url = ur + '/' + songid;
		try {
			const response = await fetch(url)
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					addbuttonvisible.set(false);
				});
		} catch (error) {
			console.error(error);
			addbuttonvisible.set(false);
		}
	}
</script>

<svelte:head>
	<title>Album</title>
	<meta name="description" content="Album page" />
</svelte:head>

<section>
	<h1>Songs</h1>
	<PlaylistSelect />
	<div class="sfaGridDiv">
		{#each songlist as songz}
			<div class="sfaOuterDiv">
				<div class="sfaDiv">
					<p>{songz.Artist}</p>
					<p>{songz.Song}</p>
				</div>
				<div class="sfaBtns">
					<button on:click={() => playSong(songz.PlayPath, songz.Albumid)} >Play</button>
					{#if $addbuttonvisible}
						<button on:click={() => addSongToPlaylist(songz.RusicId)}>Add</button>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	p {
		color: antiquewhite;
	}

	.sfaDiv {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0.5rem;
	}

	.sfaBtns {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 0.5rem;
	}

	.sfaOuterDiv {
		border: 2px solid black;
		border-radius: 12px;
	}

	.sfaGridDiv {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}
	
	button {
		margin-top: 2rem;
		padding: 12px 24px;
		border: 2px solid black;
		border-radius: 12px;
		background-color: forestgreen;
		color: black;
	}
</style>
