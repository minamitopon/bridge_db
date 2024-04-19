<script lang="ts" setup>
import { computed, ref, type Ref } from "vue";
import { type BoardInfo } from "../../../types/backend";
import { BoardInfoModel } from "../../../model/BoardInfoModel";

interface Props {
  boards: BoardInfo[];
}
interface Emits {
  (e: "clickRow", board): void;
}

/** defines */
const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const tab: Ref<string> = ref("open");
const tableHeaders = ["#", "Contract", "Side", "Tricks", "score"];
const allBoards = computed(() => {
  return props.boards.map((board) => new BoardInfoModel(board));
});

/** computed */
const openRoomResults = computed(() => {
  return allBoards.value.filter((board) => board.room === "Open Room");
});
const closedRoomResults = computed(() => {
  return allBoards.value.filter((board) => board.room === "Closed Room");
});

const clickRow = (board) => emits("clickRow", board);
</script>

<template lang="pug">
.match-results-table
  el-tabs(v-model="tab" type="border-card")
    el-tab-pane(label="Open room" name="open")
      v-table.match-results-table__table
        thead
          tr
            th(v-for="column in tableHeaders" :key="column")
              | {{ column }}
        tbody
          tr(v-for="result in openRoomResults" :key="result.boardNumber" @click="clickRow(result)")
            td {{ result.boardNumber }}
            td {{ result.contract }}
            td {{ result.declare }}
            td {{ result.result }}
            td {{ result.score }}
    el-tab-pane(label="Closed room" name="closed")
      v-table.match-results-table__table
        thead
          tr
            th(v-for="column in tableHeaders" :key="column")
              | {{ column }}
        tbody
          tr(v-for="result in closedRoomResults" :key="result.boardNumber" @click="clickRow(result)")
            td {{ result.boardNumber }}
            td {{ result.contract }}
            td {{ result.declare }}
            td {{ result.result }}
            td {{ result.score }}
</template>

<style lang="sass">
.match-results-table
  .match-results-table__table
    max-height: 200px
    .v-table__wrapper
      -ms-overflow-style: none
      scrollbar-width: none
      &::-webkit-scrollbar
        dispaly: none
</style>
