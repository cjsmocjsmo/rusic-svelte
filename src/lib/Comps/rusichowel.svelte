<script>
	import { progress, next, previous, stopPlayback } from '$lib/sound2Store.js';
	let { imgSrc } = $props();

	function handleNext() {
		next();
	}

	function handlePrevious() {
		previous();
	}

	function handleStop() {
		stopPlayback();
	}
</script>

<img id="curPlay" src={imgSrc} alt="Currently playing" />
<button class="pBtn" onclick={() => handlePrevious()}>Prev</button>
<button class="pBtn" onclick={() => handleNext()}>Next</button>
<button class="pBtn" onclick={() => handleStop()}>Stop</button>
<input type="range" min="0" max="100" bind:value={$progress} />

<style>
	input {
		width: 325px;
		height: 30px;
		border: 2px solid white;
		border-radius: 12px;
		background-color: peru;
		margin: 0.1rem;
	}

	.pBtn {
		background-color: forestgreen;
		border: 2px solid purple;
		border-radius: 20px;
		padding: 12px;
		margin-top: 2px;
		margin-bottom: 2px;
	}

	img {
		width: 75px;
		height: 75px;
	}
</style>
