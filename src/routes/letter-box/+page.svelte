<script lang="ts">
	import Head1 from '../../components/common/Head1.svelte';
	import InputTextButton from '../../components/common/InputTextButton.svelte';
	import { createLetterBox } from '../../firebase';
	import { generateRandomUUID } from '../../utils/common';
	import { countSummary } from '../../store/common';
	import { onMount } from 'svelte';
	import Button from '../../components/common/Button.svelte';

	let key = '';
	let name = '';
	let origin = '';

	onMount(() => {
		origin = window.document.location.origin;
	});

	const createUrl = async () => {
		if (!name || name === '') {
			alert('이름을 입력해주세요 !');
			return;
		}

		key = generateRandomUUID();

		await createLetterBox(key, name);
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
	{#if key === ''}
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
					내 Key : {key}
				</p>
				<a href={`${origin}/to/${key}`} target="_blank">
					내게 오는 편지지 주소 : {`${origin}/to/${key}`}
				</a>
			</div>
			<div class="button-box">
				<Button text="Key 복사하기" handleClick={() => copyLink(key)} />
				<Button
					text="편지지 주소 복사하기"
					handleClick={() => copyLink(`${origin}/to/${key}`)}
				/>
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
