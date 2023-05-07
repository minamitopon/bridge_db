<script lang="ts" setup>
import { ref, Ref } from "vue";
import { matchInfo } from "../types/matchInfo";
import { boardRecord } from "../types/boardRecord";

const text: Ref<any> = ref("");

const uploadFile = (e: any) => {
  const file = e.target.files[0];
  const fileReader = new FileReader();
  fileReader.readAsText(file);
  fileReader.onload = (el) => {
    text.value = fileReader.result;
  };
};

const send = async () => {
  const { data: res } = await useFetch("/api/upload-hands", {
    method: "POST",
    body: {
      contents: text.value,
    },
  });
};

const recentMatchData: Ref<matchInfo[]> = ref([]);
async function getRecentMatchData() {
  const { data } = await useFetch("/api/sql/match");
  recentMatchData.value = JSON.parse(data.value);
}

const findBoardSetByMatchId: Ref<boardRecord[]> = ref([]);
async function getBoardData(uuid) {
  const { data } = await useFetch("/api/sql/get-board-data", {
    method: "POST",
    body: {
      uuid: uuid,
    },
  });
  findBoardSetByMatchId.value = JSON.parse(data.value);
}
</script>

<template>
  <h1>test</h1>
  <input type="file" @change="uploadFile" />
  <br />
  <div v-for="data in recentMatchData">
    <button @click="getBoardData(data.uuid)">{{ data.name }}</button>
  </div>

  <button @click="send">test</button>
  <button @click="getRecentMatchData">get</button>
</template>
