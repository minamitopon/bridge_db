<script lang="ts" setup>
import { ref, computed, onMounted, type Ref } from "vue";
import pinia from "../../stores/";
import { useBoardInfoStore } from "../../stores/boardinfo/";
import { useHandStore } from "../../stores/hand/";
import { BoardInfoModel } from "../../model/BoardInfoModel";
import { HandModel } from "../../model/HandModel";
import { type BoardInfo } from "../../types/backend";

/** store */
const boardInfoStore = useBoardInfoStore(pinia());
const handStore = useHandStore(pinia());

/** defines */
interface Props {}
/** defines */
const Props = withDefaults(defineProps<Props>(), {});
const route = useRoute();
const uuid = ref(route.params.uuid);
const boardsInfo: Ref<BoardInfoModel[]> = ref([]);
const hands: Ref<HandModel[]> = ref([]);
const selectedBoard: Ref<BoardInfoModel> = ref(boardsInfo.value[0]);
const handOfSelectedBoard: Ref<HandModel> = ref(hands.value[0]);

const handleBack = async () => {
  await navigateTo("/");
};
const handleClick = (board) => {
  selectedBoard.value = board;
  handOfSelectedBoard.value =
    (hands.value.find((hand) => {
      hand.boardNum === board.boardNumber;
    }) as HandModel) ?? hands.value[Number(board.boardNumber) * 2 - 1];
};

onMounted(async () => {
  await Promise.all([
    boardInfoStore.fetchByUuid(uuid.value),
    handStore.fetchByUuid(uuid.value),
  ]);
  boardsInfo.value = await boardInfoStore.findByUuid(uuid.value);
  hands.value = handStore
    .findByUuid(uuid.value)
    .map((hand) => new HandModel(hand));
  selectedBoard.value = new BoardInfoModel(
    boardsInfo.value[0] as unknown as BoardInfo
  );
  handOfSelectedBoard.value = hands.value[0];
});
</script>

<template lang="pug">
.match
  .match-header
    mc-common-page-header(title="test" @back="handleBack")
  .match-main
    .match-main-results-table
      mc-match-results-table(:boards="boardsInfo" @clickRow="handleClick")
    .match-main-viewer
      og-match-viewer(:hand="handOfSelectedBoard" :board="selectedBoard")
</template>

<style lang="sass">
.match
  .match-main
    width: 800px
    margin: auto
    .match-main-results-table
      margin-bottom: 16px
</style>
