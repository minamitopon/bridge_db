<script lang="ts" setup>
const text: Ref<any> = ref("");
const title = "プレイヤー名";

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

const searchKey = ref("");
async function search(val) {
  const { data } = await useFetch("/api/sql/search/search-match", {
    method: "GET",
    query: { val },
  });
  console.log(data.value);
}
</script>

<template lang="pug">
.top
  input(type="file" @change="uploadFile")
  br
  div(v-for="data in recentMatchData")
    button(@click="getBoardData(data.uuid)")
      | {{ data.name }}

  button(@click="send")
    | test
  button(@click="getRecentMatchData")
    | get
  atom-common-label(
    :title="title"
    bold
  )
    template(v-slot:contents)
      atom-common-input(input-size="m" v-model="searchKey")
</template>
