<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  fixed: boolean;
}

const Props = withDefaults(defineProps<Props>(), {
  fixed: false,
});

const modifierClass = computed(() => {
  return {
    "am-common-table--fixed": Props.fixed,
  };
});
</script>

<template lang="pug">
table.am-common-table(:class="modifierClass")
  slot
</template>

<style lang="sass">
.am-common-table
  width: 100%
  border-collapse: collapse
  border: solid 2px #646464
  .am-common-table--fixed
    table-layout: fixed
</style>
