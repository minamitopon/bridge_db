<script lang="ts" setup>
import { ref, Ref, reactive } from "vue";
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
    method: "GET",
    query: {
      contents: text.value,
    },
  });
};

const get = async () => {
  const { data } = await useFetch("/api/sql/match");
  console.log(reactive(data.value));
};
</script>

<template>
  <h1>test</h1>
  <input type="file" @change="uploadFile" />
  <br />
  <button @click="send">test</button>
  <button @click="get">select</button>
</template>
