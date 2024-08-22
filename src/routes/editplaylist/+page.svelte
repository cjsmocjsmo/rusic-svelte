<script>
	import { onMount } from 'svelte';
	import { songsforplaylist } from '$lib/playlistStore.js';

	let playlistid = $songsforplaylist;
	let playlist = [];
	onMount(async () => {
		let url = 'http://10.0.4.35:8080/editplaylistpage/' + playlistid;
		let URL = encodeURI(url);
		try {
			const response = await fetch(URL)
				.then((response) => response.json())
				.then((data) => {
					playlist = data;
				});
		} catch (error) {
			console.error(error);
		}
	});

    async function removeSongFromPlaylist(playlistid, songid) {
        let url = 'http://10.0.4.35:8080/removesongfromplaylist/' + playlistid + '/' + songid;
        let URL = encodeURI(url);
        try {
            const response = await fetch(URL)
                .then((response) => response.json())
                .then((data) => {
                    playlist = data;
                });
        } catch (error) {
            console.error(error);
        }
    }
</script>

<svelte:head>
	<title>Edit Playlist</title>
	<meta name="description" content="Edit Playlist page" />
</svelte:head>

<h1>Edit Playlist</h1>
<section>
	
	<div class="addBtnDiv">
		<button class="addBtn"><a id="delbtn" href="/playlist">Cancel</a></button>
	</div>

	{#each playlist as song}
		<div class="plNameDiv">
			<p class="plName">Playlist:</p>
			<p class="plName">{song.Name}</p>
		</div>
		{#if song.Songs.length == 0}
			<p>No songs in playlist</p>
		{:else}
			{#each song.Songs as song2}
				<div class="mediaDiv">
					<div class="songDiv">
						<p>Artist:</p>
						<p>{song2.Artist}</p>
					</div>
					<div class="songDiv">
						<p>Album:</p>
						<p>{song2.Album}</p>
					</div>
					<div class="songDiv">
						<p>Song:</p>
						<p>{song2.Song}</p>
					</div>
					<div>
						<button class="delBtn" on:click={() => removeSongFromPlaylist(song.RusicId, song2.RusicId)}>Delete</button>
					</div>
				</div>
			{/each}
		{/if}
	{/each}
</section>

<style>
	.addBtnDiv {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 1.5rem;
	}

	.addBtn {
		width: 50%;
		height: 2.75rem;
		background-color: forestgreen;
		border: 3px solid purple;
		border-radius: 12px;
		color: #ff3e00;
	}

	.delBtn {
		background-color: #ff3e00;
		border: 3px solid purple;
		border-radius: 12px;
		margin-right: 12px;
	}

	#delbtn {
		color: #ff3e00;
	}

	.plNameDiv {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.plName {
		font-size: 1.5rem;
		margin-left: 1rem;
		margin-right: 1rem;
	}

	.mediaDiv {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border: 2px solid black;
		width: 100%;
		margin: 0.5rem;
	}

	.songDiv {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 0.5rem;
	}
</style>
