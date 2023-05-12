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
    background-image: url("https://firebasestorage.googleapis.com/v0/b/project-wyw.appspot.com/o/bg_whale_1920.jpg?alt=media&token=468d2947-10f7-45a4-ae23-89eb9334eb27");
    background-position: center;
    background-size: cover;
  }

  .rootWrapper {
    flex: 1;
  }

  @media (max-width: 768px) {
    main {
      background-image: url("https://firebasestorage.googleapis.com/v0/b/project-wyw.appspot.com/o/bg_whale_1280.jpg?alt=media&token=eacd143e-f8a5-4190-9a4e-4d345c03e505");
    }
  }
</style>
