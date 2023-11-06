<script lang="ts">
	import Head1 from '../../components/common/Head1.svelte';
	import InputTextButton from '../../components/common/InputTextButton.svelte';
	import { getLetterBoxByKey } from '../../firebase';

	let key = '';

	key = 'f08e5179-f50e-49d9-b252-578210e10006';

	const searchId = async () => {
		if (!key) {
			alert('ID를 입력해주세요.');
			return;
		}

		if (!(await getLetterBoxByKey(key))) {
			alert('편지함을 찾을 수 없어요.');
			return false;
		}

		location.href = `/to/${key}`;
	};
</script>

<Head1 center={true}>편지 보내기</Head1>
<div class="content">
	<div class="create-box">
		<p>To.</p>
		<InputTextButton
			bind:value={key}
			placeholder="보낼 편지함 ID"
			buttonText="보내기"
			handleClick={searchId}
		/>
	</div>
	<div class="more-box">
		<span>아직 내 편지함이 없다면?</span>
		<a href="/">편지함 만들기</a>
	</div>
</div>

<style>
	.content {
		display: flex;
		flex-direction: column;
		row-gap: 36px;
	}
	.content .create-box {
		position: relative;
	}
	.content .create-box p {
		position: absolute;
		left: 0;
		top: -1.5rem;
	}
	.content .more-box {
		display: flex;
		justify-content: center;
		align-items: center;
		column-gap: 8px;
	}
</style>
