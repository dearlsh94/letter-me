<script lang="ts">
  import type { Letter } from "../types/index";

  export let letter: Letter;
</script>

<div class="cardWrapper">
  <p>
    왜냐하면 <span>{letter.content}</span> (이)니까
  </p>
  <p class="rightText">
    너의 <span>{letter.from}</span> (으)로부터.
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

  @media (max-width: 768px) {
    .cardWrapper {
      width: 80%
    }
  }
</style>
