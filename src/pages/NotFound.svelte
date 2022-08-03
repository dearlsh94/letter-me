<script lang="ts">
	const moveHome = () => {
		document.location.href = "/";
	};
</script>

<div class="bodyWrapper">
	<div class="contentWrapper">
		<div class="noticeWrapper">
			<h1>존재하지 않는 페이지예요.</h1>
			<h4>고래를 타고 홈 화면으로 이동해주세요.</h4>
			<img
				src="/static/icons/icon-blue-whale-512.png"
				alt="whale-logo"
				on:click={moveHome}
			/>
		</div>
	</div>
</div>

<style>
	.noticeWrapper {
		text-align: center;
		width: 100%;
	}

	img {
    width: 60px;
    padding: 0px 20px 0px 20px;
    cursor: pointer;
  }

	h1 {
		color: white;
		font-size: 3em;
		font-weight: 100;
	}
</style>
