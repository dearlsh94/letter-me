<script lang="ts">
  import type { INickName, IPersonData } from "../../types/index";
  import { getPersonBySalt, sendNickName } from "../../firebase";
  import { redirectPage } from "../../utils/commonUtil";

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
    } else {
      alert("존재하지 않는 편지함 ID예요.");
      redirectPage("/");
    }
  };

  init();

  const send = () => {
    console.log("run send");

    if (!nickName || nickName === "") {
      alert("별명을 입력해주세요 !");
      return;
    }

    if (!reason || reason === "") {
      alert("이유를 입력해주세요 !");
      return;
    }

    if (!fromId || fromId === "") {
      alert("보내는 이의 이름을 입력해주세요 !");
      return;
    }

    const data: INickName = {
      nickName,
      reason,
      fromId,
    };

    sendNickName(salt, data);

    alert("내 친구에게 별명을 보냈어요! 나도 편지함을 만들어볼까요 ?");

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
        <input bind:value={nickName} placeholder="별명" /> (이)야
      </div>
      <div class="inputResasonWrapper">
        <input class="fullInput" bind:value={reason} placeholder="이유" /> (이)니까.
      </div>
      <div class="inputFromWrapper">
        너의
        <input bind:value={fromId} placeholder="누구" />
        (으)로부터
      </div>
    </div>
    <button class="button-6 sendButton" on:click={send}>편지함 보내기</button>
  </div>
</div>

<style>

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
