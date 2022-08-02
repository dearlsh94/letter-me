<script lang="ts">
	import { link } from "svelte-spa-router";
	import { redirectPage } from '../utils/commonUtil';
	let id: string = '';

	const searchId = () => {
		if (!id) {
			alert('ID를 입력해주세요.')
			return ;
		}

		redirectPage(`/my/${id}`)
	}

</script>

<div class="bodyWrapper">
	<div class="titleWrapper">
		<h1>내 별명을 지어줘</h1>
	</div>
	<div class="inputWrapper">
		<input type="number" bind:value={id} label="내 ID로 별명 조회하기" placeholder="내 ID로 별명 조회하기"/>
		<button on:click={searchId}>조회</button>
	</div>
	<div class="menuWrapper">
		<a href="/my" use:link>내 별명 만들기</a>
	</div>
</div>

<style>
	h1 {
		color: blue;
		font-size: 4.5rem;
		font-weight: 400;
		text-align: center;
	}

	.bodyWrapper {
		background-image: url("/static/images/bg_whale_1920.jpg");
	}

	.inputWrapper {
		margin-top: 30px;
	}

	input {
		width: 700px;
		height: 50px;
		border-radius: 8px;
		padding: 15px;
	}

	.menuWrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	@media (max-width: 768px) {
		h1 {
			font-size: 2rem;
		}

		input {
			width: 80%;
			padding: 10px;
		}

		.bodyWrapper {
			background-image: url("/static/images/bg_whale_1280.jpg");
		}
	}
</style>
