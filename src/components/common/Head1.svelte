<script lang="ts">
	export let center = false;
</script>

<h1 class:CENTER={center} {...$$props}>
	<slot />
</h1>

<style>
	h1 {
		margin: 0;
		font-size: 2rem;
		font-weight: 700;
	}
	h1.CENTER {
		text-align: center;
	}
</style>
