<script lang="ts">
	let salt: string = '';

	const searchId = () => {
		if (!salt) {
			alert('ID를 입력해주세요.');
			return;
		}

		location.href = `/my/${salt}`;
	};

	const moveCreateLink = () => {
		location.href = '/letter-box';
	};
</script>

<div class="bodyWrapper">
	<div class="titleWrapper">
		<h1>Letter Me</h1>
	</div>

	<div class="contentWrapper">
		<div class="inputButtonWrapper">
			<input
				class="textInput"
				bind:value={salt}
				placeholder="ID로 편지함 찾기"
			/>
			<button class="button-6" on:click={searchId}>편지함 찾기</button>
		</div>
		<button class="button-6 goButton" on:click={moveCreateLink}
			>편지함 만들러가기</button
		>
	</div>
</div>

<style>
	h4 {
		padding: 0px;
		margin: 5px;
	}

	.goButton {
		margin-top: 20px;
		width: 100%;
	}

	@media (max-width: 768px) {

		input {
			width: 100%;
			padding: 10px;
		}

		button {
			width: 100%;
			margin-top: 5px;
		}
	}
</style>
