<script lang="ts">
  import { tick } from "svelte";
  import { generateSalt, encryptData, decryptData } from "../utils/cryptoUtil";
  import type { IPersonData } from "../types/index";
  import { addLink } from "../firebase";

  let name: string = "";
  let salt: string = "";
  let sendLink: string = "";

  const createUrl = () => {
    salt = generateSalt();
    sendLink = `${document.location.origin}/#/send/${salt}`;

    const data: IPersonData = {
      name,
      salt,
      sendLink
    };

    const encrypted = encryptData(data);
    data.encrypted = encrypted
    data.myLink = `${document.location.origin}/#/my/${encrypted}`
    console.log(data);

    // NOTE Firebase Add
    addLink(salt, data)
  };

  // NOTE --- copy link
  let valueCopy: string | null = null;
  let areaDom: any;
  const copyLink = async () => {
    valueCopy = sendLink;
    await tick();
    areaDom.focus();
    areaDom.select();
    let message = `Copying text was successful : ${valueCopy}`;
    try {
      const successful = document.execCommand("copy");
      if (!successful) {
        message = "Copying text was unsuccessful";
      }
    } catch (err) {
      message = "Oops, unable to copy";
    }

    // we can notifi by event or storage about copy status
    console.log(message);
    valueCopy = null;
  };
</script>

<div class="bodyWrapper">
  <div class="titleWrapper">
    <h1>내 별명을 지어줘</h1>
  </div>
  {#if salt === ""}
    <div class="inputWrapper">
      <input bind:value={name} label="내 이름은" placeholder="내 이름은" />
      <button on:click={createUrl}>지어줘!</button>
    </div>
  {:else}
    <div>
      <p>
        친구들에게 {sendLink} 주소를 전달해주세요!
      </p>
      <p>
        이름을 잊어버리시면 다시 찾을 수 없으니 나만 볼 수 있는 곳에
        메모해두시길 권장드려요. (내 이름 : {name})
      </p>
      <button on:click={copyLink}> 주소 복사하기 </button>
    </div>
  {/if}
  {#if valueCopy != null}
    <textarea bind:this={areaDom}>{valueCopy}</textarea>
  {/if}
</div>

<style>
  h1 {
    color: blue;
    font-size: 4.5rem;
    font-weight: 400;
    text-align: center;
  }

  .inputWrapper {
    margin-top: 30px;
  }

  input {
    width: 700px;
    height: 50px;
    border-radius: 8px;
    padding: 15px;
  }

  textarea {
    position: fixed;
    top: 0;
    left: 0;
    width: 2em;
    height: 2em;
    padding: 0;
    border: none;
    outline: none;
    box-shadow: none;
    background: transparent;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    input {
      width: 80%;
      padding: 10px;
    }
  }
</style>
