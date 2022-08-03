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
      sendLink,
    };

    const encrypted = encryptData(data);
    data.encrypted = encrypted;
    data.myLink = `${document.location.origin}/#/my/${encrypted}`;
    console.log(data);

    // NOTE Firebase Add
    addLink(salt, data);
  };

  // NOTE --- copy link
  let valueCopy: string | null = null;
  let areaDom: any;
  const copyLink = async () => {
    valueCopy = sendLink;
    await tick();
    areaDom.focus();
    areaDom.select();
    try {
      const successful = document.execCommand("copy");
      if (successful) {
        console.log(`Copying text was successful : ${valueCopy}`);
        alert("클립보드에 주소를 복사했어요!");
      } else {
        console.log("Copying text was unsuccessful");
        alert("Oops! 복사에 실패했어요. 새로고침 후 다시 시도해주세요.");
      }
    } catch (err) {
      console.log("Oops, unable to copy");
    }

    // we can notifi by event or storage about copy status
    valueCopy = null;
  };
</script>

<div class="bodyWrapper">
  <div class="titleWrapper">
    <h1>내 별명지 만들기</h1>
  </div>
  <div class="contentWrapper">
    {#if salt !== ""}
      <div class="inputButtonWrapper">
        <input bind:value={name} label="내 이름은" placeholder="내 이름은" />
        <button class="button-6" on:click={createUrl}>생성</button>
      </div>
    {:else}
      <div class="textWrapper">
        <span> 친구들에게 아래 버튼으로 복사한 주소를 전달해주세요! </span>
        <p>
          특히 <span class="redText"
            >ID를 잊어버리시면 다시 찾으실 수 없으니
          </span>
        </p>
        <span> 나만 볼 수 있는 곳에 메모해두시길 권장드려요. </span>
        <span>
          (내 ID : {salt})
        </span>
        <div class="buttonWrapper">
          <button class="button-6 copyButton" on:click={copyLink}>
            주소 복사하기
          </button>
          <button class="button-6 copyButton" on:click={copyLink}>
            ID 복사하기
          </button>
        </div>
      </div>
    {/if}
  </div>
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

  .textWrapper {
    background-color: rgba(255, 255, 255, 0.8);
    margin: 10px 0px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  }

  .buttonWrapper {
    margin-top: 20px;
  }

  .copyButton {
    margin-bottom: 10px;
    width: 100%;
  }

  input {
    width: 80%;
    height: 50px;
    border-radius: 8px;
    padding: 15px;
  }

  p {
    margin: 0px;
    padding: 5px;
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
      width: 100%;
      padding: 10px;
    }

    button {
      width: 100%;
      margin-top: 5px;
    }
  }
</style>
