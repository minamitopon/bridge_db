<script lang="ts" setup>
import { computed, ref, type Ref } from "vue";
import { type BoardInfo } from "../../../types/backend";
import { BoardInfoModel } from "../../../model/BoardInfoModel";
import { isBetweenRange } from "../../../utils";

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
const tableHeaders = [
  "#",
  "Contract",
  "Side",
  "Tricks",
  "Score - NS",
  "Score - EW",
  "IMP - NS",
  "IMP - EW",
];
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

/** functions */
const clickRow = (board) => emits("clickRow", board);
const calcImp = (index) => {
  const openRoomResult = openRoomResults.value.find(
    (r) => r.boardNumber === index
  )?.score;
  const closedRoomResult = closedRoomResults.value.find(
    (r) => r.boardNumber === index
  )?.score;

  if (!openRoomResult || !closedRoomResult) return "Error";
  const scoreDiff: number = Math.abs(openRoomResult - closedRoomResult);
  let imp;
  if (isBetweenRange(scoreDiff, 0, 10)) imp = 0;
  if (isBetweenRange(scoreDiff, 20, 40)) imp = 1;
  if (isBetweenRange(scoreDiff, 50, 80)) imp = 2;
  if (isBetweenRange(scoreDiff, 90, 120)) imp = 3;
  if (isBetweenRange(scoreDiff, 130, 160)) imp = 4;
  if (isBetweenRange(scoreDiff, 170, 210)) imp = 5;
  if (isBetweenRange(scoreDiff, 220, 260)) imp = 6;
  if (isBetweenRange(scoreDiff, 270, 310)) imp = 7;
  if (isBetweenRange(scoreDiff, 320, 360)) imp = 8;
  if (isBetweenRange(scoreDiff, 370, 420)) imp = 9;
  if (isBetweenRange(scoreDiff, 430, 490)) imp = 10;
  if (isBetweenRange(scoreDiff, 500, 590)) imp = 11;
  if (isBetweenRange(scoreDiff, 600, 740)) imp = 12;
  if (isBetweenRange(scoreDiff, 750, 890)) imp = 13;
  if (isBetweenRange(scoreDiff, 900, 1090)) imp = 14;
  if (isBetweenRange(scoreDiff, 1100, 1290)) imp = 15;
  if (isBetweenRange(scoreDiff, 1300, 1490)) imp = 16;
  if (isBetweenRange(scoreDiff, 1500, 1740)) imp = 17;
  if (isBetweenRange(scoreDiff, 1750, 1990)) imp = 18;
  if (isBetweenRange(scoreDiff, 2000, 2240)) imp = 19;
  if (isBetweenRange(scoreDiff, 2250, 2490)) imp = 20;
  if (isBetweenRange(scoreDiff, 2500, 2990)) imp = 21;
  if (isBetweenRange(scoreDiff, 3000, 3490)) imp = 22;
  if (isBetweenRange(scoreDiff, 3500, 3990)) imp = 23;
  if (4000 <= scoreDiff) imp = 24;
  return openRoomResult - closedRoomResult > 0 ? imp : -imp;
};
</script>

<template lang="pug">
.match-results-table
  el-tabs(v-model="tab" type="border-card")
    el-tab-pane(label="Open room" name="open")
      v-table.match-results-table__table
        thead
          tr
            th.match-results-table__table-header(v-for="column in tableHeaders" :key="column")
              | {{ column }}
        tbody
          tr(v-for="result in openRoomResults" :key="result.boardNumber" @click="clickRow(result)")
            td.match-results-table__table-cell {{ result.boardNumber }}
            td.match-results-table__table-cell {{ result.contract }}
            td.match-results-table__table-cell {{ result.declare }}
            td.match-results-table__table-cell {{ result.result }}
            td.match-results-table__table-cell
              template(v-if="(result.result > 0 && result.isNS) || (result.result < 0 && !result.isNS) || (result.result === '=' && result.isNS)") {{ result.score }}
              template(v-if="result.score === 0") {{ result.score }}
            td.match-results-table__table-cell
              template(v-if="(result.result >= 0 && !result.isNS) || (result.result < 0 && result.isNS) || (result.result === '=' && !result.isNS)") {{ Math.abs(result.score) }}
              template(v-if="result.score === 0") {{ result.score }}
            td.match-results-table__table-cell
              template(v-if="calcImp(result.boardNumber) > 0") {{ calcImp(result.boardNumber) }}
              template(v-if="calcImp(result.boardNumber) === 0") --
            td.match-results-table__table-cell
              template(v-if="calcImp(result.boardNumber) < 0") {{ Math.abs(calcImp(result.boardNumber)) }}
              template(v-if="calcImp(result.boardNumber) === 0") --
    el-tab-pane(label="Closed room" name="closed")
      v-table.match-results-table__table
        thead
          tr
            th(v-for="column in tableHeaders" :key="column")
              | {{ column }}
        tbody
          tr(v-for="result in closedRoomResults" :key="result.boardNumber" @click="clickRow(result)")
            td.match-results-table__table-cell {{ result.boardNumber }}
            td.match-results-table__table-cell {{ result.contract }}
            td.match-results-table__table-cell {{ result.declare }}
            td.match-results-table__table-cell {{ result.result }}
            td.match-results-table__table-cell
              template(v-if="(result.result > 0 && result.isNS) || (result.result < 0 && !result.isNS) || (result.result === '=' && result.isNS)") {{ result.score }}
              template(v-if="result.score === 0") {{ result.score }}
            td.match-results-table__table-cell
              template(v-if="(result.result >= 0 && !result.isNS) || (result.result < 0 && result.isNS) || (result.result === '=' && !result.isNS)") {{ Math.abs(result.score) }}
              template(v-if="result.score === 0") {{ result.score }}
            td.match-results-table__table-cell
              template(v-if="calcImp(result.boardNumber) > 0") {{ calcImp(result.boardNumber) }}
              template(v-if="calcImp(result.boardNumber) === 0") --
            td.match-results-table__table-cell
              template(v-if="calcImp(result.boardNumber) < 0") {{ Math.abs(calcImp(result.boardNumber)) }}
              template(v-if="calcImp(result.boardNumber) === 0") --
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
      .match-results-table__table-header,
      .match-results-table__table-cell
        text-align: center
</style>
