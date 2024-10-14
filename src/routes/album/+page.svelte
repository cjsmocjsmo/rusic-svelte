<script>
	import { onMount } from 'svelte';
	import { songsForAlbum } from '$lib/stores.js';

	let alphabet = [];
	onMount(async () => {
		try {
			const response = await fetch('http://10.0.4.76:8080/albumstartswith')
				.then((response) => response.json())
				.then((data) => {
					alphabet = data;
				});
		} catch (error) {
			console.error(error);
		}
	});

	let albumlist = [];
	async function getalbumForAlpha(letter) {
		try {
			const response = await fetch('http://10.0.4.76:8080/albumforalpha/' + letter)
				.then((response) => response.json())
				.then((data) => {
					albumlist = data;
				});
		} catch (error) {
			console.error(error);
		}
	}

	function setSongsForAlbum(albid) {
		songsForAlbum.set(albid);
	}
</script>

<svelte:head>
	<title>Album</title>
	<meta name="description" content="Album page" />
</svelte:head>

<section>
	<div class="alphaOuterDiv">
		{#each alphabet as letter}
			<button class="alphaDiv" on:click={() => getalbumForAlpha(letter.Alpha)}>
				<div class="tooltip">
					{letter.Alpha}
					<span class="tooltiptext">Count: {letter.Count}</span>
				</div>
			</button>
		{/each}
	</div>
	<h1>Albums</h1>
	<div class="albumInfoOuterDiv">
		{#each albumlist as album}
			<div class="albumInfoDiv">
				<a href="/songsforalbum">
					<button class="albBtn" on:click={() => setSongsForAlbum(album.Albumid)}>
						<img src={album.HttpThumbPath} alt={album.Name} />
					</button>
				</a>
			</div>
		{/each}
	</div>
</section>

<style>
	.albumInfoOuterDiv {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-evenly;
		align-items: center;
		margin: 0.5rem;
	}

	.albBtn {
		padding: 12px;
		background-color: black;
		color: yellowgreen;
		border: 2px solid peru;
		border-radius: 12px;
	}

	img {
		width: 175px;
		height: 175px;
		border-radius: 12px;
	}

	section {
		display: flex;
		flex-direction: column;
	}

	.alphaOuterDiv {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-evenly;
		align-items: center;
		margin: 1rem;
	}

	.alphaDiv {
		margin: 5px;
		padding: 2px;
		font-size: 1.25rem;
		border: 2px solid black;
		border-radius: 5px;
		background-color: navy;
		color: yellowgreen;
	}

	.tooltip {
		position: relative;
		font-size: 1.25rem;
		display: inline-block;
		border-bottom: 1px dotted black;
	}

	.tooltip .tooltiptext {
		visibility: hidden;
		width: 120px;
		background-color: black;
		color: #fff;
		text-align: center;
		padding: 5px 0;
		border-radius: 6px;
		position: absolute;
		z-index: 1;
	}

	.tooltip:hover .tooltiptext {
		visibility: visible;
	}
</style>
