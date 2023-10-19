<script lang="ts">
	import type { LetterBox } from '../../../types/index';
	import { getLetterBoxByKey, sendLetter } from '../../../firebase';
	import Head1 from '../../../components/common/Head1.svelte';
	import InputTextButton from '../../../components/common/InputTextButton.svelte';
	import TextArea from '../../../components/common/TextArea.svelte';
	import { onMount } from 'svelte';

	export let data: {
		slug: string;
	};
	const { slug } = data;
	let box: LetterBox | null = null;
	let content = '';
	let from = '';

	onMount(() => {
		if (slug) {
			init();
		}
	});

	const init = async () => {
		box = await getLetterBoxByKey(slug);

		if (!box) {
			alert('존재하지 않는 편지함 ID예요.');
			// location.href = '/';
		}
	};

	const reset = () => {
		content = '';
		from = '';
	};

	const send = async () => {
		if (!content) {
			alert('내용을 입력해주세요!');
			return;
		}

		if (!from) {
			alert('보내는 이의 이름을 입력해주세요!');
			return;
		}

		await sendLetter(slug, {
			content,
			from
		});

		if (confirm('내 친구에게 별명을 보냈어요! 나도 편지함을 만들어볼까요 ?')) {
			location.href = '/';
		} else {
			reset();
		}
	};
</script>

<Head1>To. {box?.name || ''}</Head1>
<div class="content">
	<TextArea bind:content placeholder="안녕" />
	<InputTextButton
		bind:value={from}
		placeholder="From. "
		buttonText="보내기"
		handleClick={send}
	/>
</div>

<style>
	.content {
		display: flex;
		flex-direction: column;
		row-gap: 36px;
	}
</style>
