<script>
	import { onMount } from 'svelte';
	import { playlist, selectedplaylistid, addbuttonvisible } from '$lib/playlistStore.js';
	import { currentPlayingImg, currentPlayingArtist, currentPlayingSong } from '$lib/stores.js';
	import { playsingle } from '$lib/sound2Store.js';
	import PlaylistSelect from '$lib/Comps/playlistselect.svelte';

	let foobar = [];

	onMount(async () => {
		try {
			const response = await fetch('http://10.0.4.39:8080/main')
				.then((response) => response.json())
				.then((data) => {
					foobar = data;
				});
		} catch (error) {
			console.error(error);
		}
		try {
			let response2 = await fetch('http://10.0.4.39:8080/allplaylists')
				.then((response2) => response2.json())
				.then((data2) => {
					playlist.set(data2);
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		} catch (error) {
			console.error(error);
		}
	});

	async function albumofinterest() {
		try {
			const response = await fetch('http://10.0.4.39:8080/main')
				.then((response) => response.json())
				.then((data) => {
					foobar = data;
				});
		} catch (error) {}
	}

	let sfaData = [];
	async function songsforalbum(albumid) {
		try {
			const response = await fetch('http://10.0.4.39:8080/songsforalbum/' + albumid)
				.then((response) => response.json())
				.then((data) => {
					sfaData = data;
				});
		} catch (error) {}
	}

	function clear() {
		sfaData = [];
	}

	function playSong(src, albid) {
		getCurrentPlayingImg(albid);
		playsingle(src);
		clear();
	}

	async function getCurrentPlayingImg(albid) {
		try {
			const response = await fetch('http://10.0.4.39:8080/currentPlayingImg/' + albid)
				.then((response) => response.json())
				.then((data) => {
					currentPlayingImg.set(data.HttpThumbPath);
				});
		} catch (error) {
			console.error(error);
		}
	}

	async function addSongToPlaylist(songid) {
		const u = 'http://10.0.4.39:8080/addsongtoplaylist';
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
	<title>Rusic</title>
	<meta name="description" content="Rusic Svelte App" />
</svelte:head>

<section>
	<button class="imgBtn">
		<p>{$currentPlayingSong}</p>
		<img id="curPlay" src={$currentPlayingImg} alt="Currently playing" />
		<p>{$currentPlayingArtist}</p>
	</button>
	<div>
		<button on:click={albumofinterest} on:keydown={albumofinterest} alt="albumofinterest"
			>Random Album</button
		>
		<button id="clearBtn" on:click={clear}>Clear</button>
	</div>

	<div>
		{#each foobar as foo}
			<button
				class="fooBtn"
				on:click={() => songsforalbum(foo.AlbumId)}
				on:keydown={() => songsforalbum(foo.AlbumId)}
			>
				<img class="CurPlay" src={foo.HttpThumbPath} alt={foo.AlbumId} />
			</button>
		{/each}
	</div>

	{#if sfaData.length > 0}
		<PlaylistSelect />
		<div class="sfaGridDiv">
			{#each sfaData as sfa}
				<div class="sfaOuterDiv">
					<div class="sfaDiv">
						<p>{sfa.Artist}</p>
						<p>{sfa.Song}</p>
					</div>
					<div class="sfaBtns">
						<button on:click={() => playSong(sfa.PlayPath, sfa.Albumid)}>Play</button>
						{#if $addbuttonvisible}
							<button on:click={() => addSongToPlaylist(sfa.RusicId)}>Add</button>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<span></span>
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	p {
		color: antiquewhite;
		font-size: 1.25rem;
	}

	.fooBtn {
		padding: 5px;
		border: 2px solid black;
		border-radius: 12px;
		background-color: peru;
		color: black;
	}

	span {
		color: blue;
		font-size: 1rem;
		margin: 0.5rem;
		text-decoration: underline;
	}

	button {
		margin-top: 2rem;
		padding: 12px 24px;
		border: 2px solid black;
		border-radius: 12px;
		background-color: forestgreen;
		color: black;
	}

	.imgBtn {
		background-color: transparent;
		border: none;
	}

	#curPlay {
		width: 250px;
		height: 250px;
		border-radius: 12px;
	}

	.CurPlay {
		width: 125px;
		height: 125px;
		border: 1 solid peru;
		border-radius: 12px;
		margin: 0.5rem;
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
	#clearBtn {
		margin-bottom: 2rem;
		padding: 12px 24px;
		border: 2px solid black;
		border-radius: 12px;
		background-color: forestgreen;
		color: black;
	}
</style>
