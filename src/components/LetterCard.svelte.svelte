<script lang="ts">
	import type { Letter } from '../types/index';

	export let letter: Letter;
	export let isOpen = false;
</script>

<div class="letter-card">
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
	}

	@media (max-width: 768px) {
		.letter-card {
			width: 80%;
		}
	}
</style>
