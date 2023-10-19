<script lang="ts">
	import type { Letter, LetterBox } from '../../../types/index';
	import { getPersonBySalt, sendLetter } from '../../../firebase';
	import Head1 from '../../../components/common/Head1.svelte';
	import InputTextButton from '../../../components/common/InputTextButton.svelte';
	import TextArea from '../../../components/common/TextArea.svelte';

	interface IParam {
		salt: string;
	}
	export let params: IParam = {
		salt: ''
	};
	const salt: string = params.salt;
	let name = '';
	let content = '';
	let from = '';

	const init = async () => {
		const person: LetterBox | null = await getPersonBySalt(salt);
		if (person) {
			name = person.name;
		} else {
			alert('존재하지 않는 편지함 ID예요.');
			location.href = '/';
		}
	};

	init();

	const send = () => {
		if (!content) {
			alert('내용을 입력해주세요!');
			return;
		}

		if (!from) {
			alert('보내는 이의 이름을 입력해주세요!');
			return;
		}

		const data: Letter = {
			content,
			from
		};

		sendLetter(salt, data);

		alert('내 친구에게 별명을 보냈어요! 나도 편지함을 만들어볼까요 ?');

		location.href = '/';
	};
</script>

<Head1>To. {name}</Head1>
<div class="content">
	<TextArea bind:content />
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
