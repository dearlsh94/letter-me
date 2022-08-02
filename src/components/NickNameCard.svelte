<script lang="ts">
  import type { INickName } from "../types/index";

  export let nickName: INickName;
</script>

<div class="cardWrapper">
  <p>
    너는 <span class="boldText">{nickName.nickName}</span>야.
  </p>
  <p>
    왜냐하면 <span>{nickName.reason}</span>
  </p>
  <p class="rightText">
    너의 <span>{nickName.fromId}</span>로부터.
  </p>
</div>

<style>
  p {
    width: 100%;
  }

  span {
    width: 100%;
  }

  .cardWrapper {
    background-color: white;
    margin: 10px 20px;
    padding: 10px;
    border-radius: 5px;
    width: 250px;
    min-height: 150px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .boldText {
    font-weight: bold;
    font-style: oblique;
    text-decoration: underline;
    color: blue;
  }

  .rightText {
    text-align: right;
  }
</style>
