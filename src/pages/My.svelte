<script lang="ts">
	import NickNameCard from "../components/NickNameCard.svelte";
	import { decryptData } from "../utils/cryptoUtil";
	import type { INickName, IPersonData } from "../types/index";
	import { getPersonBySalt } from "../firebase";

	interface IParam {
		salt: string;
	}
	export let params: IParam = {
		salt: "",
	};
	let data: IPersonData = {
		name: "",
		salt: "",
	};
	let person: IPersonData | null = null;

	const init = async () => {
		person = await getPersonBySalt(params.salt);

		if (person === null) {
			alert("존재하지 않는 ID예요.");
		}

		console.log(person);
	};

	if (params.salt !== "") {
		init();
	}
</script>

<div class="bodyWrapper">
	<div class="titleWrapper">
		<h1>{person ? person.name : ""}의</h1>
		<h1>별명들</h1>
	</div>

	<div class="contentWrapper">
		{#if person && person.nickNames}
			<div class="cardsWrapper">
				{#each person.nickNames as nickName}
					<NickNameCard {nickName} />
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	h1 {
		color: blue;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	.cardsWrapper {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		width: 100%
	}
</style>
