<script lang="ts">
	import { openLetter } from '../store/common';
	import type { Letter } from '../types/index';

	export let letter: Letter;
	export let isOpen = false;

	const handleClick = () => {
		openLetter.set(letter);
	};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="letter-card"
	on:click={handleClick}
	on:keyup={handleClick}
	aria-label={`From.${letter.from} 편지 보기`}
>
	<p>
		From. <span>{letter.from}</span>
	</p>
	{#if isOpen}
		{letter.content}
	{/if}
</div>

<style>
	.letter-card {
		box-sizing: border-box;
		background-color: #fff;
		border: 1px solid #e5e5e5;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		padding: 12px;
		border-radius: 12px;
		width: 100%;
		height: 150px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
	@media (hover: hover) and (pointer: fine) {
		.letter-card {
			transition: transform 0.3s;
		}
		.letter-card:hover {
			transform: translateY(-8px);
		}
	}
</style>
