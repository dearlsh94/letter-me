<script lang="ts">
	export let url = '';
	export let label = '';
</script>

<a href={url} aria-label={`${label} 이동`} {...$$props}>
	<slot />
</a>

<style>
	a {
		display: block;
		width: 100%;
	}
</style>