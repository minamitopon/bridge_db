<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  title: string;
  fontSize: "xs" | "s" | "m" | "l" | "xl";
  labelPosition: "left" | "center" | "right";
  bold: boolean;
}
const Props = withDefaults(defineProps<Props>(), {
  fontSize: "m",
  labelPosition: "left",
  bold: false,
});

const modifierClass = computed(() => {
  return {
    "am-common-label--center": Props.labelPosition === "center",
    "am-common-label--right": Props.labelPosition === "right",
    "am-common-label--bold": Props.bold,
    "am-common-label--font-x-small": Props.fontSize === "xs",
    "am-common-label--font-small": Props.fontSize === "s",
    "am-common-label--font-medium": Props.fontSize === "m",
    "am-common-label--font-large": Props.fontSize === "l",
    "am-common-label--font-x-large": Props.fontSize === "xl",
  };
});
</script>

<template lang="pug">
.am-common-label(:class="modifierClass")
  span.am-common-label-label
    | {{ title }}
  span.am-common-label-contents
    slot(name="contents")
</template>

<style lang="sass">
.am-common-label
  display: inline-flex
  flex-direction: column
  align-items: flex-start
  &.am-common-label--center
    align-items: center
  &.am-common-label--right
    align-items: flex-end
  &.am-common-label--bold
    .am-common-label-label
      font-weight: 600
  &.am-common-label--font-x-small
    .am-common-label-label
      font-size: 10px
  &.am-common-label--font-small
    .am-common-label-label
      font-size: 12px
  &.am-common-label--font-medium
    .am-common-label-label
      font-size: 14px
  &.am-common-label--font-large
    .am-common-label-label
      font-size: 16px
  &.am-common-label--font-x-large
    .am-common-label-label
      font-size: 20px
  .am-common-label-label
    margin-bottom: 4px
    color: #424242
  .am-common-label-contents
    margin-bottom: 4px
</style>
