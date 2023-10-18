<script lang="ts">
	import { getLinkCount } from '../../firebase';
	import type { IInfoCount } from '../../types/index';

	let infoCount: IInfoCount = {
		userCount: 0,
		nickNameCount: 0
	};

	const init = async () => {
		const res = await getLinkCount();
		if (res) {
			infoCount = res;
		}
	};

	init();
</script>

<div class="footerWrapper">
	<div class="infoWrapper">
		<p class="infoText">
			{infoCount.userCount}개의 편지함이 만들어졌어요.
		</p>
		<p class="infoText">
			{infoCount.nickNameCount}개의 편지함가 보내졌어요.
		</p>
	</div>
</div>

<style>
	.footerWrapper {
		background-color: rgba(255, 255, 255, 0.5);
		padding: 5px 5px;
		text-align: center;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
</style>
