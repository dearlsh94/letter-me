<script lang="ts">
	import { openLetter } from '../store/common';
	import type { Letter } from '../types/index';

	export let letter: Letter;
	export let isOpen = false;

	const handleClick = () => {
		openLetter.set(letter);
	};
</script>

<div
	class="letter-card"
	role="button"
	tabindex={-1}
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
		background-color: gray;
		padding: 12px;
		border-radius: 12px;
		width: 100%;
		height: 150px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	@media (max-width: 768px) {
		.letter-card {
			width: 80%;
		}
	}
</style>
