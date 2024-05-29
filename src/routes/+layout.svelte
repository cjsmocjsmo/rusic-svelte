<script>
	import { currentPlayingImg } from '$lib/stores.js';
	import { onMount } from 'svelte';
	import './styles.css';
	import Header from './Header.svelte';
	import NoSleep from 'nosleep.js';
	import RusicHowler from '$lib/Comps/rusichowel.svelte';

	let noSleep;

	onMount(() => {
		noSleep = new NoSleep();
	});
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<div class="footerDiv">
			<RusicHowler imgSrc={$currentPlayingImg} />
		</div>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		position: sticky;
		bottom: 0;
	}

	.footerDiv {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 12px;
		background-color: black;
	}
</style>
