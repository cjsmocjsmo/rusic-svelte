<script>
	import { onMount } from 'svelte';
	import { playlist, selectedplaylistid, selectedplaylistname, addbuttonvisible } from '$lib/playlistStore.js';

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

	let selected = '';

	function setSelection(plid, name) {
		selected = plid;
		selectedplaylistid.set(plid);
		addbuttonvisible.set(true);
		selectedplaylistname.set(name);
		visible = false;
	}

	let visible = false;
	function isVisible() {
		visible = !visible;
	}

</script>
<div class="selDiv">
	<button on:click={() => isVisible()}>Playlist: {$selectedplaylistname}</button>
</div>


{#if visible}
<div class="selDiv">
	<div class="innerDiv">
		{#each $playlist as plist}
			<button on:click={() => setSelection(plist.RusicId, plist.Name)}>{plist.Name}</button
			>
		{/each}
	</div>
	
	<div class="selDiv2">
		<p id="selName">{$selectedplaylistname}</p>
		<p> has been selected.</p>
	</div>

</div>
{/if}

<style>
	.selDiv2 {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	p {
		text-align: center;
	}

	#selName {
		margin-right: 1rem;
		font-weight: bold;
		font-size: 1.5rem;
		color: antiquewhite;
	}

	.selDiv {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.innerDiv {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	button {
		background-color: forestgreen;
		color: black;
		font-size: 1rem;
		padding: 0.25rem 0.5rem;
		margin: 0.25rem;
		border: 2px solid black;
		border-radius: 5px;
	}
</style>
