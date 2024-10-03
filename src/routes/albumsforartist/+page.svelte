<script>
	import { onMount } from 'svelte';
	import { albumForArtistArtistId } from '$lib/stores.js';
	import { albumForArtistAlbumId } from '$lib/stores.js';

	let albumss = [];
	onMount(async () => {
		let artid = $albumForArtistArtistId;
		try {
			const response = await fetch('http://10.0.4.39:8080/albumsforartist/' + artid)
				.then((response) => response.json())
				.then((data) => {
					albumss = data;
				});
		} catch (error) {
			console.error(error);
		}
	});

	function setAlbumForArtistAlbumId(albumId) {
		albumForArtistAlbumId.set(albumId);
	}
</script>

<svelte:head>
	<title>Albums For Artist</title>
	<meta name="description" content="Albums For Artist" />
</svelte:head>

<section>
	<h1>Albums</h1>
	<div class="albumInfoOuterDiv">
		{#each albumss as albums}
			<button
				on:click={() => setAlbumForArtistAlbumId(albums.Albumid)}
				on:keydown={(event) => {
					if (event.key === 'Enter') setAlbumForArtistAlbumId(albums.Albumid);
				}}
			>
				<a href="/albumsforartistsongs">
					<img src={albums.HttpThumbPath} alt={albums.Album} />
				</a>
			</button>
		{/each}
	</div>
</section>

<style>
	.albumInfoOuterDiv {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		grid-gap: 0.5rem;
	}

	button {
		background-color: peru;
		border: 2px solid peru;
		border-radius: 12px;
	}

	img {
		width: 200px;
		height: 200px;
		padding: 5px;
		border-radius: 12px;
	}
</style>
