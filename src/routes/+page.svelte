<script lang="ts">
	import Head1 from '../components/common/Head1.svelte';
	import InputTextButton from '../components/common/InputTextButton.svelte';

	let salt = '';

	const searchId = () => {
		if (!salt) {
			alert('ID를 입력해주세요.');
			return;
		}

		location.href = `/my/${salt}`;
	};
</script>

<Head1 center={true}>서로를 향한 편지 한 통, Letter Me</Head1>
<div class="content">
	<InputTextButton
		bind:value={salt}
		placeholder="ID로 편지함 찾기"
		buttonText="편지함 찾기"
		handleClick={searchId}
	/>
	<div>
		<span>아직 내 편지함이 없다면?</span>
		<a href="/letter-box">편지함 만들기</a>
	</div>
</div>

<style>
	.content {
		display: flex;
		flex-direction: column;
		row-gap: 36px;
	}
</style>
