<script lang="ts">
	import type { LetterBox } from '../../../types/index';
	import { getLetterBoxByKey } from '../../../firebase';
	import { onMount } from 'svelte';
	import LetterCard from '../../../components/LetterCard.svelte.svelte';

	export let data: {
		slug: string;
	};
	const { slug } = data;

	let box: LetterBox | null = null;

	onMount(() => {
		if (slug) {
			init();
		}
	});

	const init = async () => {
		box = await getLetterBoxByKey(slug);
		console.log({ box });
		if (!box) {
			alert('존재하지 않는 편지함 ID예요.');
			// location.href = '/';
		}
	};

	// NOTE --- copy link
	let valueCopy: string | null = null;
	let areaDom: any;
	const copyLink = async () => {
		valueCopy = `${document.location.origin}/#/send/${slug}`;
		areaDom.focus();
		areaDom.select();
		try {
			const successful = document.execCommand('copy');
			if (successful) {
				console.log(`Copying text was successful : ${valueCopy}`);
				alert('클립보드에 편지함 작성 주소를 복사했어요!');
			} else {
				console.log('Copying text was unsuccessful');
				alert('복사에 실패했어요. 새로고침 후 다시 시도해주세요.');
			}
		} catch (err) {
			console.log('Oops, unable to copy');
		}

		// we can notifi by event or storage about copy status
		valueCopy = null;
	};
</script>

<div class="bodyWrapper">
	{#if box}
		<div class="titleWrapper">
			<h1>{box.name || ''}의</h1>
			<h1>별명들</h1>
			<h4>총 {Object.keys(box.letters).length}개의 별명이 있어요.</h4>
			<span class="copyText" on:click={copyLink} on:keypress={copyLink}>
				편지함 작성 주소 복사하기
			</span>
			{#if valueCopy != null}
				<textarea bind:this={areaDom}>{valueCopy}</textarea>
			{/if}
		</div>

		<div class="contentWrapper">
			{#if box.letters}
				<div class="cardsWrapper">
					{#each Object.values(box.letters) as letter}
						<LetterCard {letter} />
					{/each}
				</div>
			{/if}
		</div>
	{:else}
		<div class="titleWrapper" />
		<div class="contentWrapper" />
	{/if}
</div>

<style>
	.copyText {
		text-decoration: underline;
		cursor: pointer;
	}

	.cardsWrapper {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		width: 100%;
	}
</style>
