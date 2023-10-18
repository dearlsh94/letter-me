<script>
	import './global.css';
</script>

<div class="app">
	<header>
		<div class='logo-box'>Letter Me</div>
		<nav>
			<ul>
				<li>Home</li>
				<li>Create</li>
			</ul>
		</nav>
	</header>
	<main>
		<slot />
	</main>
	<footer>
		<p>
			visit <a href="https://github.com/dearlsh94/letter-me">Github</a>
		</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 60px;
		padding: 0px 12px;
		border-bottom: 1px solid #e5e5e5;
	}
	header nav ul {
		display: flex;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
		row-gap: 40px;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
