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
</template>
