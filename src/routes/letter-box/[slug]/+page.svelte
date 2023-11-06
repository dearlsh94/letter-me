<script lang="ts">
	import type { Letter, LetterBox } from '../../../types/index';
	import { getLetterBoxByKey } from '../../../firebase';
	import { onMount } from 'svelte';
	import LetterCard from '../../../components/LetterCard.svelte.svelte';
	import Head1 from '../../../components/common/Head1.svelte';
	import LoadingSpinner from '../../../components/common/LoadingSpinner.svelte';

	export let data: {
		slug: string;
		from: string;
	};
	const { slug, from } = data;

	let isLoading = true;
	let box: LetterBox | null = null;
	let letters: Letter[] = [];

	onMount(() => {
		if (slug) {
			init();
		}
	});

	const init = async () => {
		try {
			box = await getLetterBoxByKey(slug);
			if (!box) {
				alert('존재하지 않는 편지함 ID예요.');
				// location.href = '/';
			} else {
				letters = Object.entries(box.letters).map(([key, value]) => {
					return {
						key,
						...value
					};
				});
			}
		} catch (error) {
			console.error(error);
		} finally {
			isLoading = false;
		}
	};
</script>

<div class="title">
	<Head1>
		{#if isLoading}
			편지함 찾는 중...
		{:else}
			To. {box?.name || ''}
		{/if}
	</Head1>
	{#if box}
		<sub>총 {letters.length}개의 편지가 있어요.</sub>
	{/if}
</div>
<div class="content">
	{#if isLoading}
		<LoadingSpinner />
	{:else if box}
		{#if letters.length}
			<div class="letters-box">
				{#each letters as letter}
					<LetterCard {letter} isOpen={from === letter.from} />
				{/each}
			</div>
		{/if}
	{/if}
</div>

<style>
	.title {
		display: flex;
		align-items: flex-end;
		column-gap: 12px;
	}
	.content {
		display: flex;
		flex-direction: column;
		row-gap: 32px;
	}
	.letters-box {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		row-gap: 24px;
		column-gap: 16px;
	}
	@media (max-width: 768px) {
		.letters-box {
			grid-template-columns: repeat(1, 1fr);
		}
	}
</style>
