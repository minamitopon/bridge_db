<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
/** defines */
interface Props {}
/** defines */
const Props = withDefaults(defineProps<Props>(), {});
const route = useRoute();
const uuid = ref(route.params.uuid);
const handleBack = () => {
  /* NOP */
};

const vugraphData = computed(() => {
  console.log(uuid);
  return;
});
onMounted(() => {
  // Promise.all();
});
</script>

<template lang="pug">
.match
  .match-header
    mc-common-page-header(title="test" @back="handleBack")
  .match-main
    p {{ uuid }}
    p テスト用ID 81a88a08-e4b6-4d5e-9d05-ceac018c16f7
</template>
