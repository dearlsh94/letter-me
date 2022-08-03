<script lang="ts">
	import NickNameCard from "../components/NickNameCard.svelte";
	import { decryptData } from "../utils/cryptoUtil";
	import type { INickName, IPersonData } from "../types/index";
	import { getPersonBySalt } from "../firebase";

	interface IParam {
		encrypt?: string;
	}
	export let params: IParam = {};
	let data: IPersonData = {
		name: "",
		salt: "",
	};
	let person: IPersonData | null = null;

	if (params.encrypt) {
		data = decryptData(params.encrypt);
		console.log(data);
	}

	const init = async () => {
		person = await getPersonBySalt(data.salt);
		console.log(person);
	};

	if (data.salt !== "") {
		init();
	}
</script>

<div class="bodyWrapper">
	<div class="titleWrapper">
		<h1>{data?.name}의 별명들은!</h1>
	</div>

	{#if person && person.nickNames}
		<div class="cardsWrapper">
			{#each person.nickNames as nickName}
				<NickNameCard {nickName} />
			{/each}
		</div>
	{/if}
</div>

<style>
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	.cardsWrapper {
		width: 700px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: 40px;
	}
</style>
