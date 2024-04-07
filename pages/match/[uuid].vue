<script lang="ts" setup>
import { ref, computed, onMounted, type Ref } from "vue";
import pinia from "../../stores/";
import { useBoardInfoStore } from "../../stores/boardinfo/";
import { useHandStore } from "../../stores/hand/";
import { BoardInfoModel } from "../../model/BoardInfoModel";
import { HandModel } from "../../model/HandModel";
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
const selectedBoard: Ref<HandModel> = ref(hands.value[0]);
const handleBack = () => {
  /* NOP */
};
const handleClick = (num) => {
  selectedBoard.value =
    (hands.value.find((hand) => {
      hand.boardNum === num;
    }) as HandModel) ?? hands.value[Number(num) * 2 - 1];
};

const vugraphData = computed(() => {
  return;
});
onMounted(async () => {
  await Promise.all([
    boardInfoStore.fetchByUuid(uuid.value),
    handStore.fetchByUuid(uuid.value),
  ]);
  boardsInfo.value = boardInfoStore.findByUuid(uuid.value);
  hands.value = handStore
    .findByUuid(uuid.value)
    .map((hand) => new HandModel(hand));
  selectedBoard.value = hands.value[0];
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
      og-match-viewer(:hand="selectedBoard")
</template>

<style lang="sass">
.match-main
  max-width: 800px
  margin: auto
  .match-main-results-table
    margin-bottom: 16px
</style>
