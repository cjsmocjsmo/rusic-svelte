<script>
	import { page } from '$app/stores';
</script>

<header>
	<nav>
		<a href="/"><button>Home</button></a>
		<a href="/artist"><button>Artists</button></a>
		<a href="/album"><button>Albums</button></a>
		<a href="/song"><button>Songs</button></a>
		<a href="/playlist"><button>Playlists</button></a>
	</nav>
	<div>
		<a href="http://10.0.4.58:8090/"><button>Movies</button></a>
		<a href="http://10.0.4.58:8091/"><button>TV</button></a>
	</div>
</header>

<style>
	header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 1rem;
	}

	button {
		background-color: forestgreen;
		padding: 12px 24px;
		width: 8rem;
		border: 2px solid rgb(161, 6, 167);
		border-radius: 12px;
		font-size: 1.5rem;
		color: black;

	}
</style>
