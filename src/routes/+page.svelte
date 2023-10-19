<script lang="ts">
	import Head1 from '../components/common/Head1.svelte';
	import InputTextButton from '../components/common/InputTextButton.svelte';
	import { createLetterBox } from '../firebase';
	import { generateRandomUUID } from '../utils/common';
	import { countSummary } from '../store/common';
	import { onMount } from 'svelte';
	import Button from '../components/common/Button.svelte';
	import { copyText } from '../utils/common';

	let key = 'key-key';
	let name = 'hi';
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
</script>

{#if key || true}
	<Head1 center={true}>반갑습니다, {name}님</Head1>
	<div class="content">
		<div class="completed-box">
			<p>생성하신 편지함의 Key 정보입니다.</p>
			<p class="key">
				{key}
			</p>
			<ul class="notices-box">
				<li>
					<strong>Key를 잃어버리시면 편지함을 다시 찾으실 수 없으니 </strong> 나만
					볼 수 있는 곳에 메모해두시길 권장드려요.
				</li>
				<li>지금 화면을 캡쳐하시는 것도 좋아요!</li>
				<li>
					편지지 주소는 내 편지함으로 오는 편지를 작성할 수 있는 주소예요. 복사하신 후 편하게 공유 해보세요.
				</li>
			</ul>
			<div class="button-box">
				<Button text="Key 복사하기" handleClick={() => copyText(key)} />
				<Button
					text="편지지 주소 복사하기"
					handleClick={() => copyText(`${origin}/to/${key}`)}
				/>
			</div>
		</div>
	</div>
{:else}
	<Head1 center={true}>서로를 향한 편지 한 통, Letter Me</Head1>
	<div class="content">
		{#if key === ''}
			<div class="create-box">
				<p>I'm</p>
				<InputTextButton
					bind:value={name}
					placeholder={'편지를 받을 내 이름'}
					buttonText="만들기"
					handleClick={createUrl}
				/>
			</div>
			<div class="more-box">
				<span>이미 만든 편지함이 있다면?</span>
				<a href="/letter-box">내 편지함 찾기</a>
			</div>
		{/if}
	</div>
{/if}

<style>
	.content {
		display: flex;
		flex-direction: column;
		row-gap: 36px;
	}
	.content .more-box {
		display: flex;
		justify-content: center;
		align-items: center;
		column-gap: 8px;
	}
	.content .create-box {
		position: relative;
	}
	.content .create-box p {
		position: absolute;
		left: 0;
		top: -1.5rem;
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
</style>
