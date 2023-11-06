<script lang="ts">
	import Head1 from '../../components/common/Head1.svelte';
	import InputTextButton from '../../components/common/InputTextButton.svelte';

	let key = '';

	const searchId = () => {
		if (!key) {
			alert('ID를 입력해주세요.');
			return;
		}

		location.href = `/letter-box/${key}`;
	};
</script>

<Head1 center={true}>내 편지함 찾기</Head1>
<div class="content">
	<InputTextButton
		bind:value={key}
		placeholder="ID로 편지함 찾기"
		buttonText="편지함 찾기"
		handleClick={searchId}
	/>
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
	.content .more-box {
		display: flex;
		justify-content: center;
		align-items: center;
		column-gap: 8px;
	}
</style>
