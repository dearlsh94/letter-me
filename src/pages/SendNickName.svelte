<script lang="ts">
  import type { INickName, IPersonData } from "../types/index";
  import { getPersonBySalt, sendNickName } from "../firebase";
  import { redirectPage } from "../utils/commonUtil";

  interface IParam {
    salt: string;
  }
  export let params: IParam = {
    salt: "",
  };
  const salt: string = params.salt;
  let name = "";
  let nickName = "";
  let reason = "";
  let fromId = "";

  const init = async () => {
    const person: IPersonData | null = await getPersonBySalt(salt);
    console.log(person);
    if (person) {
      name = person.name;
    }
  };

  init();

  const send = () => {
    console.log("run send");
    const data: INickName = {
      nickName,
      reason,
      fromId,
    };

    sendNickName(salt, data);

    alert("내 친구에게 별명을 보냈어요!");

    redirectPage("/");
  };
</script>

<div class="bodyWrapper">
  <div class="titleWrapper">
    <h1>내가 생각하는 {name}은(는)</h1>
  </div>
  <div class="contentWrapper">
    <div class="inputBox">
      <div class="inputNickNameWrapper">
        <input bind:value={nickName} label="별명" placeholder="별명" /> (이)야
      </div>
      <div class="inputResasonWrapper">
        <input
          class="fullInput"
          bind:value={reason}
          label="이유"
          placeholder="이유"
        /> (이)니까.
      </div>
      <div class="inputFromWrapper">
        너의
        <input bind:value={fromId} label="누구" placeholder="누구" />
         (으)로부터
      </div>
    </div>
    <button class="button-6 sendButton" on:click={send}>별명지 보내기</button>
  </div>
</div>

<style>
  h1 {
    color: blue;
  }

  input {
    padding: 3px 8px;
  }

  .inputBox {
    background-color: white;
    padding: 10px;
    border-radius: 5px;
  }

  .inputNickNameWrapper {
    text-align: left;
  }

  .inputResasonWrapper {
    text-align: left;
    margin-top: 5px;
  }

  .inputFromWrapper {
    text-align: right;
    margin-top: 7px;
  }

  .fullInput {
    width: 80%;
  }

  .sendButton {
    width: 100%;
    margin-top: 30px;
  }
</style>
