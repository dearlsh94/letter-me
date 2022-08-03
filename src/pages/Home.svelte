<script lang="ts">
	import { redirectPage } from "../utils/commonUtil";
	let salt: string = "";

	const searchId = () => {
		if (!salt) {
			alert("ID를 입력해주세요.");
			return;
		}

		redirectPage(`/my/${salt}`);
	};

	const moveCreateLink = () => {
		redirectPage(`/create`);
	};
</script>

<div class="bodyWrapper">
	<div class="titleWrapper">
		<h1>내 별명을 지어줘 !</h1>
		<h4>What's My Nickname ?</h4>
	</div>

	<div class="contentWrapper">
		<div class="inputButtonWrapper">
			<input
				class="textInput"
				bind:value={salt}
				label="내 ID로 별명 찾기"
				placeholder="내 ID로 별명 찾기"
			/>
			<button class="button-6" on:click={searchId}>찾기</button>
		</div>
		<button class="button-6 goButton" on:click={moveCreateLink}
			>내 별명 만들러가기</button
		>
	</div>
</div>

<style>
	h1 {
		color: blue;
		font-size: 4.5rem;
		font-weight: 400;
		text-align: center;
	}

	h4 {
		padding: 0px;
		margin: 5px;
	}

	.goButton {
		margin-top: 20px;
		width: 100%;
	}

	@media (max-width: 768px) {
		h1 {
			font-size: 2rem;
		}

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
