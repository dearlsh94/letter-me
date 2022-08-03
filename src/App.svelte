<script>
	import Router from "svelte-spa-router";
	import routes from "./routes";
	import Footer from "./components/common/Footer.svelte";
	import Header from "./components/common/Header.svelte";
</script>

<main>
	<Header />
	<div class="rootWrapper">
		<Router {routes} />
	</div>
	<Footer />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
		height: auto;
		background-image: url("/static/images/bg_whale_1920.jpg");
		background-position: center;
		background-size: cover;
	}

	.rootWrapper {
		flex: 1
	}

	@media (max-width: 768px) {
		main {
			background-image: url("/static/images/bg_whale_1280.jpg");
		}
	}
</style>
