<script lang="ts">
	import type { IPersonData } from '../../types/index';
	import Head1 from '../../components/common/Head1.svelte';
	import InputTextButton from '../../components/common/InputTextButton.svelte';
	import { addLink } from '../../firebase';
	import { generateRandomUUID } from '../../utils/common';

	let name: string = '';
	let salt = '';
	let sendLink: string = '';

	const createUrl = () => {
		if (!name || name === '') {
			alert('이름을 입력해주세요 !');
			return;
		}

		salt = generateRandomUUID();

		sendLink = `${document.location.origin}/send/${salt}`;
		const data: IPersonData = {
			name,
			salt,
			sendLink
		};
		data.myLink = `${document.location.origin}/my/${salt}`;

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
<div class="content">
	{#if salt === '' && false}
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
			<ul class='notices-box'>
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
				<p>
					내게 오는 편지지 주소 :
				</p>
			</div>
			<div class="button-box">
				<button class="button-6 copyButton" on:click={() => copyLink('id')}>
					Key 복사하기
				</button>
				<button class="button-6 copyButton" on:click={() => copyLink('link')}>
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
	.content .completed-box .notices-box{
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
