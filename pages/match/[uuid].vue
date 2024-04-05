<script lang="ts" setup>
import { ref, computed, onMounted, type Ref } from "vue";
import pinia from "../../stores/";
import { useBoardInfoStore } from "../../stores/boardinfo/";
import { BoardInfoModel } from "../../model/BoardInfoModel";
/** store */
const boardInfoStore = useBoardInfoStore(pinia());
/** defines */
interface Props {}
/** defines */
const Props = withDefaults(defineProps<Props>(), {});
const route = useRoute();
const uuid = ref(route.params.uuid);
const boardsInfo: Ref<BoardInfoModel[]> = ref([]);
const handleBack = () => {
  /* NOP */
};

const vugraphData = computed(() => {
  return;
});
onMounted(async () => {
  await boardInfoStore.fetchByUuid(uuid.value);
  boardsInfo.value = boardInfoStore.findByUuid(uuid.value);
});
</script>

<template lang="pug">
.match
  .match-header
    mc-common-page-header(title="test" @back="handleBack")
  .match-main
    mc-match-results-table(:boards="boardsInfo")

</template>
