<script>
  import Router from 'svelte-spa-router'
	import routes from './routes'
</script>

<main>
	<Router {routes} />
</main>

<style>
	main {
		display: flex;
		width: 100%;
		height: 100%;
	}
</style>