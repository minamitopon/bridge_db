<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  innerSize: "xs" | "s" | "m" | "l" | "xl";
}
const Props = withDefaults(defineProps<Props>(), {
  innerSize: "m",
});

const modifierClass = computed(() => {
  return {
    "am-common-inner--x-small": Props.innerSize === "xs",
    "am-common-inner--small": Props.innerSize === "s",
    "am-common-inner--medium": Props.innerSize === "m",
    "am-common-inner--large": Props.innerSize === "l",
    "am-common-inner--x-large": Props.innerSize === "xl",
  };
});
</script>

<template lang="pug">
.am-common-inner(:class="modifierClass")
  slot(name="content")
</template>

<style lang="sass">
.am-common-inner
  &.am-common-inner--x-small
    width: 200px
  &.am-common-inner--small
    width: 400px
  &.am-common-inner--medium
    width: 800px
  &.am-common-inner--large
    width: 1000px
  &.am-common-inner--x-large
    width: 1200px
</style>
