<script lang="ts">
  import type { IPersonData } from "../types/index";
  import { getPersonBySalt, sendNickName } from "../firebase";

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
    const data = {
      nickName,
      reason,
      fromId
    }

    sendNickName(salt, data)
  };
</script>

<div class="bodyWrapper">
  <div class="titleWrapper">
    <h1>내가 생각하는 {name}은(는)</h1>
  </div>
  <div class="inputWrapper">
    <input bind:value={nickName} label="별명" placeholder="별명" />
    <input bind:value={reason} label="이유" placeholder="이유" />
    너의
    <input bind:value={fromId} label="누구" placeholder="누구" />
    로부터
  </div>
  <div>
    <button on:click={send}>보내기</button>
  </div>
</div>

<style>
</style>
