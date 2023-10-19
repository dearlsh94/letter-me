<script lang="ts">
	import type { LetterBox } from '../../types/index';
	import Head1 from '../../components/common/Head1.svelte';
	import InputTextButton from '../../components/common/InputTextButton.svelte';
	import { addLink } from '../../firebase';
	import { generateRandomUUID } from '../../utils/common';
	import { countSummary } from '../../store/common';

	let name: string = '';
	let salt = '';

	const createUrl = async () => {
		if (!name || name === '') {
			alert('이름을 입력해주세요 !');
			return;
		}

		salt = generateRandomUUID();

		const data: LetterBox = {
			name,
			salt
		};

		await addLink(salt, data);
		countSummary.refresh();
	};

	const copyLink = async (textToCopy = '') => {
		try {
			if (navigator.clipboard) {
				await navigator.clipboard.writeText(textToCopy);
			} else {
				const textField = document.createElement('textarea');
				textField.innerText = textToCopy;
				document.body.appendChild(textField);
				textField.select();
				document.execCommand('copy');
				textField.remove();
			}
			alert('클립보드에 복사했어요!');
		} catch (error) {
			alert('복사되지 않았어요.');
		}
	};
</script>

<Head1 center={true}>내 편지함 만들기</Head1>
<div class="content">
	{#if salt === ''}
		<InputTextButton
			bind:value={name}
			placeholder={'To. '}
			buttonText="만들기"
			handleClick={createUrl}
		/>
		<div>
			<span>이미 만든 편지함이 있다면?</span>
			<a href="/">내 편지함 찾기</a>
		</div>
	{:else}
		<div class="completed-box">
			<ul class="notices-box">
				<li>
					아래 <em>내게 오는 편지지 주소</em>에서 편지를 보내면 내 편지함에서
					확인할 수 있어요.
				</li>
				<li>
					특히 <strong class="redText"
						>Key를 잃어버리시면 편지함을 다시 찾으실 수 없으니
					</strong> 나만 볼 수 있는 곳에 메모해두시길 권장드려요.
				</li>
				<li>지금 화면을 캡쳐하시는 것도 좋아요!</li>
			</ul>
			<div class="id-box">
				<p>
					내 Key : {salt}
				</p>
				<a href={`https://letter.treefeely.com/to/${salt}`} target="_blank">
					내게 오는 편지지 주소 : {`https://letter.treefeely.com/to/${salt}`}
				</a>
			</div>
			<div class="button-box">
				<button class="button-6 copyButton" on:click={() => copyLink(salt)}>
					Key 복사하기
				</button>
				<button
					class="button-6 copyButton"
					on:click={() => copyLink(`https://letter.treefeely.com/to/${salt}`)}
				>
					편지지 주소 복사하기
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.content {
		display: flex;
		flex-direction: column;
		row-gap: 36px;
	}
	.content .completed-box {
		display: flex;
		flex-direction: column;
		row-gap: 32px;
	}
	.content .completed-box .notices-box {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.content .completed-box .button-box {
		display: flex;
		flex-direction: column;
		row-gap: 12px;
	}
	.content .completed-box .button-box button {
		width: 100%;
	}
</style>
