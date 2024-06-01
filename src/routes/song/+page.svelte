<script>
	import { onMount } from 'svelte';
	import { currentPlayingImg } from '$lib/stores.js'
	import { selectedplaylistid, addbuttonvisible } from '$lib/playlistStore.js'
	import { playsingle } from '$lib/sound2Store.js';
	import PlaylistSelect from '$lib/Comps/playlistselect.svelte';

	let pagelist = [];
	onMount(async () => {
		try {
			const response = await fetch('http://192.168.0.74:8080/songpages')
				.then((response) => response.json())
				.then((data) => {
					pagelist = data;
				});
		} catch (error) {
			console.error(error);
		}
	});

	let songlist = [];

	async function songsforpage(page) {
		let url = `http://192.168.0.74:8080/songsforpage/${page}`;
		const response = await fetch(url)
			.then((response) => response.json())
			.then((data) => {
				songlist = data;
			});
		visible = false;
	}

	let visible = false;
	function isVisible() {
		visible = !visible;
		const pagesList = document.querySelector('.pagesList');
		if (visible) {
			pagesList.style.display = 'block';
		} else {
			pagesList.style.display = 'none';
		}
	}

	function playSong(src, albid) {
		getCurrentPlayingImg(albid);
		playsingle(src);
		clear();
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
</script>

<svelte:head>
	<title>Songs</title>
	<meta name="description" content="Songs page" />
</svelte:head>

<section>
	<h1>Songs</h1>
	<PlaylistSelect />
	<div class="">
		<button id="pageBtn" on:click={isVisible}>Select A Page</button>
		{#if visible}
			<div class="pagesList">
				{#each pagelist as page}
					<button class="plBtn" on:click={() => songsforpage(page)}>{page}</button>
				{/each}
			</div>
		{/if}
		
		{#if songlist.length === 0}
			<p style="font-size:22px">Please Select A Page</p>
		{:else}
			<div class="sfaGridDiv">
				{#each songlist as song}
					<div class="sfaOuterDiv">
						<div class="sfaDiv">
							<p class="songP">{song.Song}</p>
							<p>{song.Artist}</p>
						</div>
						<div class="sfaBtns">
							<button on:click={() => playSong(song.PlayPath, song.Albumid)}>Play</button>
							{#if $addbuttonvisible}
								<button on:click={() => addSongToPlaylist(song.SongId)}>Add</button>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	p {
		font-size: 0.65rem;
		color: antiquewhite;
	}
	.songP {
		font-size: 1rem;
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
	#pageBtn {
		width: 100%;
	}
	.plBtn {
		margin-top: 0.5rem;
		padding: 6px 12px;
		border: 2px solid black;
		border-radius: 6px;
		background-color: forestgreen;
		color: black;
	}
</style>
