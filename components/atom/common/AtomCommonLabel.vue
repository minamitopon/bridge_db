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
    "atom-common-label--center": Props.labelPosition === "center",
    "atom-common-label--right": Props.labelPosition === "right",
    "atom-common-label--bold": Props.bold,
    "atom-common-label--font-x-small": Props.fontSize === "xs",
    "atom-common-label--font-small": Props.fontSize === "s",
    "atom-common-label--font-medium": Props.fontSize === "m",
    "atom-common-label--font-large": Props.fontSize === "l",
    "atom-common-label--font-x-large": Props.fontSize === "xl",
  };
});
</script>

<template lang="pug">
.atom-common-label(:class="modifierClass")
  span.atom-common-label-label
    | {{ title }}
  span.atom-common-label-contents
    slot(name="contents")
</template>

<style lang="sass">
.atom-common-label
  display: inline-flex
  flex-direction: column
  align-items: flex-start
  &.atom-common-label--center
    align-items: center
  &.atom-common-label--right
    align-items: flex-end
  &.atom-common-label--bold
    .atom-common-label-label
      font-weight: 600
  &.atom-common-label--font-x-small
    .atom-common-label-label
      font-size: 10px
  &.atom-common-label--font-small
    .atom-common-label-label
      font-size: 12px
  &.atom-common-label--font-medium
    .atom-common-label-label
      font-size: 14px
  &.atom-common-label--font-large
    .atom-common-label-label
      font-size: 16px
  &.atom-common-label--font-x-large
    .atom-common-label-label
      font-size: 20px
  .atom-common-label-label
    margin-bottom: 4px
    color: #424242
  .atom-common-label-contents
    margin-bottom: 4px
</style>
