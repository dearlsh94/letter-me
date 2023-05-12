<script lang="ts">
  const moveHome = () => {
    document.location.href = "/";
  };
</script>

<div>
  <img
    src="/static/icons/icon-blue-whale-512.png"
    alt="whale-logo"
    on:click={moveHome}
    on:keypress={moveHome}
  />
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
