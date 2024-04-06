<script lang="ts" setup>
import { ref, computed, onMounted, type Ref } from "vue";
import pinia from "../../stores/";
import { useBoardInfoStore } from "../../stores/boardinfo/";
import { useHandStore } from "../../stores/hand/";
import { BoardInfoModel } from "../../model/BoardInfoModel";
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
const hands: Ref<any[]> = ref([]);

const handleBack = () => {
  /* NOP */
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
  hands.value = handStore.findByUuid(uuid.value);
});
</script>

<template lang="pug">
.match
  .match-header
    mc-common-page-header(title="test" @back="handleBack")
  .match-main
    mc-match-results-table(:boards="boardsInfo")
</template>
