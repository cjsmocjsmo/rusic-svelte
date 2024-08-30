<script>
	import { onMount } from 'svelte';
	import { albumForArtistArtistId } from '$lib/stores.js';

	let alphabet = [];
	onMount(async () => {
		try {
			const response = await fetch('http://192.168.0.120:8080/artiststartswith')
				.then((response) => response.json())
				.then((data) => {
					alphabet = data;
				});
		} catch (error) {
			console.error(error);
		}
	});

	let artistlist = [];
	async function getArtistForAlpha(letter) {
		try {
			const response = await fetch('http://192.168.0.120:8080/artistforalpha/' + letter)
				.then((response) => response.json())
				.then((data) => {
					artistlist = data;
				});
		} catch (error) {
			console.error(error);
		}
	}

	async function setAlbumsForArtist(artid) {
		albumForArtistArtistId.set(artid);
	}
</script>

<svelte:head>
	<title>Artist</title>
	<meta name="description" content="About this app" />
</svelte:head>

<section>
	<div class="alphaOuterDiv">
		{#each alphabet as letter}
			<button class="alphaDiv" on:click={() => getArtistForAlpha(letter.Alpha)}>
				<div class="tooltip">
					{letter.Alpha}
					<span class="tooltiptext">Count: {letter.Count}</span>
				</div>
			</button>
		{/each}
	</div>
	<h1>Artist</h1>
	<div class="artistInfoOuterDiv">
		{#each artistlist as artist}
			<a href="/albumsforartist" on:click={() => setAlbumsForArtist(artist.Artistid)}>
				<div class="artistInfoDiv">
					<button class="artBtn">{artist.Artist}</button>
				</div>
			</a>
		{/each}
	</div>
</section>

<style>
	.artistInfoOuterDiv {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-evenly;
		align-items: center;
		margin: 0.5rem;
	}

	.artBtn {
		font-size: 1.18rem;
		width: 17rem;
		height: 5rem;
		padding: 12px 24px;
		margin: 0.25rem;
		background-color: black;
		color: yellowgreen;
		border: 2px solid peru;
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
