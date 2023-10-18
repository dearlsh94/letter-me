<script lang="ts">
	import { onMount } from 'svelte';
	import { getLinkCount } from '../firebase';
	import type { CountSummary } from '../types';
	import './global.css';

	let countSummary: CountSummary = {
		letterBoxCount: 0,
		letterCount: 0
	};

	onMount(async () => {
		countSummary = await getLinkCount();
	});
</script>

<div class="app">
	<header>
		<div class="logo-box">Letter Me</div>
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
		<div class="info-box">
			<p>
				{countSummary.letterBoxCount}개의 편지함이 만들어졌어요.
			</p>
			<p>
				{countSummary.letterCount}개의 편지가 보내졌어요.
			</p>
		</div>
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
		height: 4rem;
		padding: 0px 1rem;
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
		row-gap: 3rem;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		row-gap: 1rem;
	}
	footer .info-box {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
	footer .info-box p {
		font-size: 0.75rem;
	}

	footer a {
		font-weight: bold;
	}
</style>
