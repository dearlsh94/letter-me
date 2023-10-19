<script lang="ts">
	import Linker from './Linker.svelte';
</script>

<div {...$$props}>
	<Linker url="/" label="홈">
		<img src="/static/icons/icon-blue-whale-512.png" alt="whale-logo" />
	</Linker>
</div>

<style>
	img {
		width: 50px;
		padding: 15px 20px 0px 20px;
		cursor: pointer;
	}

	@media (max-width: 768px) {
		img {
			width: 30px;
			padding: 12px 15px 0px 15px;
		}
	}
</style>
