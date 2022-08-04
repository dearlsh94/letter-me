<script lang="ts">
	import { tick } from "svelte";
	import NickNameCard from "../components/NickNameCard.svelte";
	import type { IPersonData } from "../types/index";
	import { getPersonBySalt } from "../firebase";
	import { redirectPage } from "../utils/commonUtil";

	interface IParam {
		salt: string;
	}
	export let params: IParam = {
		salt: "b3ffcf78536332da53f359f3239322c6",
	};
	let person: IPersonData | null = null;

	const init = async () => {
		person = await getPersonBySalt(params.salt);

		if (person === null) {
			alert("존재하지 않는 ID예요.");
			redirectPage("/");
		}

		console.log(person);
	};

	if (params.salt !== "") {
		init();
	}

	// NOTE --- copy link
	let valueCopy: string | null = null;
	let areaDom: any;
	const copyLink = async () => {
		valueCopy = `${document.location.origin}/#/send/${params.salt}`;
		await tick();
		areaDom.focus();
		areaDom.select();
		try {
			const successful = document.execCommand("copy");
			if (successful) {
				console.log(`Copying text was successful : ${valueCopy}`);
				alert("클립보드에 내 별명지 작성 주소를 복사했어요!");
			} else {
				console.log("Copying text was unsuccessful");
				alert("Oops! 복사에 실패했어요. 새로고침 후 다시 시도해주세요.");
			}
		} catch (err) {
			console.log("Oops, unable to copy");
		}

		// we can notifi by event or storage about copy status
		valueCopy = null;
	};
</script>

<div class="bodyWrapper">
	{#if person}
		<div class="titleWrapper">
			<h1>{person ? person.name : ""}의</h1>
			<h1>별명들</h1>
			<h4>총 {person?.nickNames?.length}개의 별명이 있어요.</h4>
			<span class="copyText" on:click={copyLink}>
				별명지 작성 주소 복사하기
			</span>
			{#if valueCopy != null}
				<textarea bind:this={areaDom}>{valueCopy}</textarea>
			{/if}
		</div>

		<div class="contentWrapper">
			{#if person.nickNames}
				<div class="cardsWrapper">
					{#each person.nickNames as nickName}
						<NickNameCard {nickName} />
					{/each}
				</div>
			{/if}
		</div>
	{:else}
		<div class="titleWrapper">
		</div>
		<div class="contentWrapper" />
	{/if}
</div>

<style>
	h1 {
		color: blue;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	.copyText {
		text-decoration: underline;
		cursor: pointer;
	}

	.cardsWrapper {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		width: 100%;
	}
</style>
