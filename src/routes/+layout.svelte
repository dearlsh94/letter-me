<script lang="ts">
	import './global.css';
	import { countSummary } from '../store/common';
	import { onMount } from 'svelte';
	import Linker from '../components/common/Linker.svelte';
	import LetterDialog from '../components/LetterDialog.svelte';

	onMount(() => {
		countSummary.refresh();
	});
</script>

<div class="background" />
<div class="app">
	<header>
		<div class="logo-box">
			<Linker url="/" label="홈">
				<div>Letter Me</div>
			</Linker>
		</div>
		<nav>
			<ul>
				<li>
					<Linker url={'/'} label="홈">Home</Linker>
				</li>
				<li>
					<Linker url={'/to'} label="편지 쓰기">To</Linker>
				</li>
				<li>
					<Linker url={'/letter-box'} label="편지함">Box</Linker>
				</li>
			</ul>
		</nav>
	</header>
	<main>
		<slot />
		<LetterDialog />
	</main>
	<footer>
		<div class="info-box">
			<p>
				{$countSummary.letterBoxCount}개의 편지함이 만들어졌어요.
			</p>
			<p>
				{$countSummary.letterCount}개의 편지가 보내졌어요.
			</p>
		</div>
		<p>
			<Linker
				url="https://github.com/dearlsh94/letter-me"
				label="Github"
				target="_blank"
			>
				Github
			</Linker>
			<span>Image Created By DALL-E3</span>
		</p>
	</footer>
</div>

<style>
	.background {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		background-image: url($lib/images/postbox.jpeg);
		background-repeat: no-repeat;
		background-position: center center;
		background-size: cover;
		opacity: 0.3;
	}
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		z-index: 1;
		position: relative;
	}
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 4rem;
		padding: 0px 1rem;
		border-bottom: 1px solid #e5e5e5;
		background-color: rgba(255, 255, 255, 0.9);
	}
	header :global(a) {
		color: #333;
		text-decoration: none;
	}
	header nav ul {
		display: flex;
	}
	header nav ul li {
		width: 64px;
		text-align: center;
		transition: transform 0.3s;
	}
	@media (hover: hover) {
		header nav ul li:hover {
			transform: translateY(-4px);
		}
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
	footer p {
		text-align: center;
	}
	footer p span {
		font-size: 0.7rem;
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
</style>
