<script>
	import { onMount } from 'svelte';
	import { playplist } from '$lib/sound2Store.js';
	import { currentPlayingImg, currentPlayingArtist, currentPlayingSong } from '$lib/stores.js';
	import { playlist, songsforplaylist, playlistplaysongids } from '$lib/playlistStore.js';

	let playlist_present = false;

	onMount(async () => {
		let response = await fetch('http://192.168.0.91:8080/playlistcheck')
			.then((response) => response.json())
			.then((data) => {
				playlist_present = data;
			})
			.catch((error) => {
				console.error('Error:', error);
			});
		if (playlist_present) {
			let response2 = await fetch('http://192.168.0.91:8080/allplaylists')
				.then((response2) => response2.json())
				.then((data2) => {
					playlist.set(data2);
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		}
	});

	async function getAllPlaylists() {
		let response3 = await fetch('http://192.168.0.91:8080/allplaylists')
			.then((response3) => response3.json())
			.then((data3) => {
				playlist.set(data3);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}

	let name = '';
	async function addEmptyPlaylist() {
		let URL = 'http://192.168.0.91:8080/createemptyplaylist/' + name;
		let url = encodeURI(URL);
		try {
			const response = await fetch(url)
				.then((response) => response.json())
				.then((data) => {});
		} catch (error) {
			console.error(error);
		}
		toggleVisible2();
		getAllPlaylists();
	}

	let randomname = '';
	let count = '';

	async function addRandomPlaylist() {
		let url = 'http://192.168.0.91:8080/createrandomplaylist/' + randomname + '/' + count;
		let URL = encodeURI(url);
		try {
			const response = await fetch(URL)
				.then((response) => response.json())
				.then((data) => {});
		} catch (error) {
			console.error(error);
		}
		toggleVisible3();
		getAllPlaylists();
	}

	function setSongsForPlaylist(rusicid) {
		songsforplaylist.set(rusicid);
	}

	async function deletePlaylist(rusicidd) {
		let url = 'http://192.168.0.91:8080/deleteplaylist/' + rusicidd;
		let URL = encodeURI(url);
		try {
			const response = await fetch(URL)
				.then((response) => response.json())
				.then((data) => {
					playlist.set(data);
				});
		} catch (error) {
			console.error(error);
		}
	}

	async function playPlaylist(rusicid) {
		let url = 'http://192.168.0.91:8080/playplaylist/' + rusicid;
		let URL = encodeURI(url);
		try {
			const response = await fetch(URL)
				.then((response) => response.json())
				.then((data) => {
					playlistplaysongids.set(data);
					playplist(data);
				});
		} catch (error) {
			console.error(error);
		}
	}

	let visible = true;
	let visible2 = false;
	function toggleVisible2() {
		visible = !visible;
		visible2 = !visible2;
	}

	let visible3 = false;
	let visible4 = true;
	function toggleVisible3() {
		visible3 = !visible3;
		visible4 = !visible4;
	}
</script>

<svelte:head>
	<title>Playlist</title>
	<meta name="description" content="Playlist" />
</svelte:head>

<h1>Playlist</h1>
<div class="addBtnDiv">
	<button class="addBtn" on:click={() => toggleVisible2()}>Add Empty</button>
	<button class="addBtn" on:click={() => toggleVisible3()}>Add Random</button>
</div>

<section id="upperSection">
	<div class="outerDiv">
		{#if playlist_present}
			<div class="innerDiv">
				{#if visible}
					{#each $playlist as item}
						<div class="playlistBtnDiv">
							<a href="/editplaylist">
								<button on:click={() => setSongsForPlaylist(item.RusicId)} class="playlistBtn"
									>{item.Name} ...{item.NumSongs}</button
								>
							</a>
							<button class="playBtn" on:click={() => playPlaylist(item.RusicId)}>play</button>
							<button class="deleteBtn" on:click={() => deletePlaylist(item.RusicId)}>delete</button
							>
						</div>
					{/each}
				{/if}
				{#if visible2}
					<section>
						<form>
							<label for="playlistNme">Playlist Name:</label>
							<input bind:value={name} type="text" id="playlistNme" name="playlistNme" required />
							<button class="addBtn" on:click|preventDefault={() => addEmptyPlaylist()}>Add</button>
							<button class="addBtn" on:click={() => toggleVisible2()}>Cancel</button>
						</form>
					</section>
				{/if}
			</div>
		{:else}
			<div class="innerDiv">
				<p>No playlists found.</p>
				<p>Please create one.</p>
			</div>
		{/if}

		<div class="innerDiv">
			<div class="outerBtnDiv">
				{#if visible4}
					<p>{$currentPlayingSong}</p>
					<button class="imgBtn">
						<img id="curPlay" src={$currentPlayingImg} alt="Currently playing" />
					</button>
					<p>{$currentPlayingArtist}</p>
				{/if}
			</div>
			{#if visible3}
				<section>
					<form>
						<label for="randomName">Name:</label>
						<input bind:value={randomname} type="text" id="randomName" name="randomName" required />
						<label for="count">Count:</label>
						<input bind:value={count} type="text" id="count" name="count" required />
						<button class="addBtn" on:click|preventDefault={() => addRandomPlaylist()}>Add</button>
						<button class="addBtn" on:click={() => toggleVisible3()}>Cancel</button>
					</form>
				</section>
			{/if}
		</div>
	</div>
</section>

<style>
	p {
		color: antiquewhite;
	}

	form {
		margin: 2rem;
	}

	input {
		width: 250px;
		height: 30px;
		border: 2px solid purple;
		border-radius: 12px;
		background-color: peru;
		margin: 0.1rem;
	}

	.addBtnDiv {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 0.1rem;
	}

	.addBtn {
		background-color: forestgreen;
		border: 2px solid purple;
		border-radius: 12px;
		padding: 12px 24px;
		margin-top: 2px;
		margin-bottom: 2px;
		width: 50%;
	}

	.playBtn {
		background-color: forestgreen;
		border: 2px solid purple;
		border-radius: 12px;
		padding: 6px 12px;
		color: white;
	}

	.deleteBtn {
		background-color: firebrick;
		border: 2px solid purple;
		border-radius: 12px;
		padding: 6px 12px;
		color: white;
	}

	.playlistBtn {
		background-color: forestgreen;
		border: 2px solid purple;
		border-radius: 12px;
		padding: 6px 24px;
		width: 250px;
	}

	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	#curPlay {
		width: 250px;
		height: 250px;
		border-radius: 12px;
	}

	.imgBtn {
		background-color: transparent;
		border: none;
	}

	.outerBtnDiv {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.innerDiv {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 49.9%;
		height: 25rem;
		border: 5px solid black;
		margin: 0.1rem;
	}

	.outerDiv {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>
