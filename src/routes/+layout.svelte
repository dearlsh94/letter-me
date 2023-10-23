<script lang="ts">
	import './global.css';
	import { countSummary, openLetter } from '../store/common';
	import { onMount } from 'svelte';
	import Linker from '../components/common/Linker.svelte';

	onMount(() => {
		countSummary.refresh();
	});
</script>

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
					<Linker url={'/letter-box'} label="편지함">My</Linker>
				</li>
			</ul>
		</nav>
	</header>
	<main>
		<slot />
		{#if $openLetter}
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<dialog open on:click={openLetter.close} on:keyup={openLetter.close}>
				<p>
					To. {$openLetter.to}
				</p>
				<p>
					{$openLetter.content}
				</p>
				<p>
					From. {$openLetter.from}
				</p>
			</dialog>
		{/if}
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
