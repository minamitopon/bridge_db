<script lang="ts" setup>
import { type Ref, ref, computed, onMounted } from "vue";
import { useMatchRecordStore } from "../stores/matchRecord/matchRecord";
import pinia from "../stores/index";
const store = useMatchRecordStore(pinia());

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

async function searchByConditions(query) {}

async function created() {
  await store.getAllRecords();
}
created();

const records = computed(() => {
  return store.getAllRecord;
});
</script>

<template lang="pug">
.top
  input(type="file" @change="uploadFile")
  br

  button(@click="send")
    | test
  p {{ records }}
</template>
