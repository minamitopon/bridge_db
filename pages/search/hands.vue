<!-- <script lang="ts" setup>
import { ref, computed } from "vue";
import { type matchRecord } from "../../types/front/index";
import { useMatchRecordStore } from "../../stores/matchRecord/matchRecord";
import pinia from "../../stores/index";

const defaultMatchRecordArray: matchRecord[] = [];
const store = useMatchRecordStore(pinia());

async function search(conditions) {
  await store.searchRecord(conditions);
}

const cols = computed(() => {
  return ["auto", "80px", "auto", "120px", "120px"];
});

const row = computed(() => {
  return store.getNarrowedRecord;
});
</script>

<template lang="pug">
.search
  am-common-inner(inner-size="m")
    template(v-slot:content)
      og-search-hands(@search="search")
  am-common-inner(inner-size="m")
    template(v-slot:content)
      am-common-table(fixed)
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
          am-common-table-row(v-for="match in row")
            am-common-table-cell
              | {{ match.name }}
            am-common-table-cell
              | {{ match.round }}
            am-common-table-cell
              | {{ match.players }}
            am-common-table-cell
              | {{ match.teamOpen }}
            am-common-table-cell
              | {{ match.teamClose }}
</template> -->
