<script lang="ts">
	import NickNameCard from "../components/NickNameCard.svelte";
	import type { INickName } from "../types/index";

	interface IParam {
		id?: string;
	}

	export let params: IParam = {};

	let nickNames: INickName[] = [
		{
			nickName: "star",
			reason: "bling bling bling bling",
			fromId: 1234,
		},
		{
			nickName: "flower",
			reason: "beauty beautybeauty beautybeauty beautybeauty beautybeauty beautybeauty beautybeauty beautybeauty beautybeauty beautybeauty beautybeauty beautybeauty beautybeauty beautybeauty beautybeauty beautybeauty beautybeauty beautybeauty beautybeauty beauty",
			fromId: 2345,
		},
		{
			nickName: "air",
			reason: "no see",
			fromId: 3456,
		},
		{
			nickName: "fire",
			reason: "angry",
			fromId: 4567,
		},
	];
</script>

<div class="bodyWrapper">
	<div class="titleWrapper">
		<h1>{params?.id}의 별명들은!</h1>
	</div>

	<div class="urlWrapper">
		<span>URL : </span>
		<!-- <img src="../d"> -->
	</div>

	<div class="cardsWrapper">
		{#each nickNames as nickName}
			<NickNameCard {nickName} />
		{/each}
	</div>
</div>

<style>
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	.bodyWrapper {
		background-image: url("/static/images/bg_whale_1920.jpg");
	}

	.urlWrapper {
		margin-top: 10px;
	}

	.cardsWrapper {
		width: 700px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: 40px;
	}
</style>
