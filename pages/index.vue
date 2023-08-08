<script lang="ts" setup>
import { type Ref, ref, computed } from "vue";
import { useMatchRecordStore } from "../stores/matchRecord/matchRecord";
import pinia from "../stores/index";
import { MatchData } from "../model/match";
import { type matchRecord } from "../types/front/index";
import { cloneDeep } from "lodash";

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

async function created() {
  await store.getAllRecords();
}
created();

const allRecords = computed<matchRecord[]>(() => {
  return store.getAllRecord;
});
const classedRecords = computed(() => {
  const arr = cloneDeep(allRecords.value);
  return arr.map((rec) => new MatchData(rec));
});
const cols = computed(() => {
  return ["auto", "96px", "auto", "120px", "120px"];
});
</script>

<template lang="pug">
.top
  input(type="file" @change="uploadFile")
  br

  button(@click="send")
    | test
  am-common-inner(inner-size="l")
    template(v-slot:content)
      am-common-table
        colgroup
          col(v-for="col in cols" :width="col")
        thead
          am-common-table-row
            am-common-table-header-cell
              | 試合名
            am-common-table-header-cell
              | ラウンド
            am-common-table-header-cell
              | プレイヤー
            am-common-table-header-cell
              | チーム１
            am-common-table-header-cell
              | チーム２
        tbody
          am-common-table-row(v-for="record in classedRecords")
            am-common-table-cell
              | {{ record.name }}
            am-common-table-cell
              | {{ record.round }}
            am-common-table-cell
              | {{ record.players }}
            am-common-table-cell
              | {{ record.teamOpen }}
            am-common-table-cell
              | {{ record.teamClose }}
</template>
