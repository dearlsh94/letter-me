<script lang="ts">
	import { generateSalt } from '../../utils/cryptoUtil';
	import type { IPersonData } from '../../types/index';
	import Head1 from '../../components/common/Head1.svelte';
	import InputTextButton from '../../components/common/InputTextButton.svelte';
	import { addLink } from '../../firebase';

	let name: string = '';
	let salt = '';
	let sendLink: string = '';

	const createUrl = () => {
		if (!name || name === '') {
			alert('이름을 입력해주세요 !');
			return;
		}

		salt = generateSalt();

		sendLink = `${document.location.origin}/#/send/${salt}`;
		const data: IPersonData = {
			name,
			salt,
			sendLink
		};
		data.myLink = `${document.location.origin}/#/my/${salt}`;

		addLink(salt, data);
	};

	// NOTE --- copy link
	let valueCopy: string | null = null;
	let areaDom: any;
	const copyLink = async (type: 'link' | 'id') => {
		valueCopy = type === 'link' ? sendLink : type === 'id' ? salt : '';
		areaDom.focus();
		areaDom.select();
		try {
			const successful = document.execCommand('copy');
			if (successful) {
				console.log(`Copying text was successful : ${valueCopy}`);
				alert('클립보드에 주소를 복사했어요!');
			} else {
				console.log('Copying text was unsuccessful');
				alert('Oops! 복사에 실패했어요. 새로고침 후 다시 시도해주세요.');
			}
		} catch (err) {
			console.log('Oops, unable to copy');
		}

		// we can notifi by event or storage about copy status
		valueCopy = null;
	};
</script>

<Head1 center={true}>내 편지함 만들기</Head1>
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
	<div class="textWrapper">
		<span> 친구들에게 아래 버튼으로 복사한 주소를 전달해주세요! </span>
		<p>
			특히 <span class="redText">ID를 잊어버리시면 다시 찾으실 수 없으니 </span>
		</p>
		<span> 나만 볼 수 있는 곳에 메모해두시길 권장드려요.</span>
		<span>지금 화면 캡쳐도 좋아요 !</span>
		<span class="paddingText">
			(내 ID : {salt})
		</span>
		<div class="buttonWrapper">
			<button class="button-6 copyButton" on:click={() => copyLink('link')}>
				편지함 작성 주소 복사하기
			</button>
			{#if valueCopy != null}
				<textarea bind:this={areaDom}>{valueCopy}</textarea>
			{/if}
			<button class="button-6 copyButton" on:click={() => copyLink('id')}>
				내 ID 복사하기
			</button>
		</div>
	</div>
{/if}

<style>
	.textWrapper {
		background-color: rgba(255, 255, 255, 0.8);
		margin: 10px 0px;
		padding: 15px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
	}

	.buttonWrapper {
		margin-top: 20px;
	}

	.copyButton {
		margin-bottom: 10px;
		width: 100%;
	}

	.paddingText {
		padding: 5px 0px;
	}

	p {
		margin: 0px;
		padding: 5px;
	}

	textarea {
		position: fixed;
		top: 0;
		left: 0;
		width: 2em;
		height: 2em;
		padding: 0;
		border: none;
		outline: none;
		box-shadow: none;
		background: transparent;
	}
</style>
