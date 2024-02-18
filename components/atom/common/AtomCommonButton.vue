<script lang="ts" setup>
import { computed } from "vue";
import { type imgOptions } from "../../../types/front/index";

interface Props {
  size: "s" | "m" | "l";
  color?: "spade" | "heart" | "diamond" | "club";
  label?: string;
  disabled?: boolean;
  plain?: boolean;
  icon?: string;
  width?: number;
  height?: number;
  styleOption?: imgOptions;
}

const Props = withDefaults(defineProps<Props>(), {
  color: "club",
  plain: true,
  disabled: false,
});

const modifierClass = computed(() => {
  return {
    "atom-common-button__with-icon": Props.icon,
  };
});

const buttonSize = computed(() => {
  return Props.size === "s"
    ? "small"
    : Props.size === "m"
    ? "default"
    : "large";
});

const buttonColor = computed(() => {
  return Props.color === "spade"
    ? "#424242"
    : Props.color === "heart"
    ? "#ab4f69"
    : Props.color === "diamond"
    ? "#ffd97a"
    : "#5a7c7b";
});

const buttonSvg = computed(() => {
  return `/images/svg/${Props.icon}.svg`;
});

interface Emits {
  (e: "click"): void;
}
const emits = defineEmits<Emits>();
const onClick = () => {
  emits("click");
};
</script>

<template lang="pug">
el-button.atom-common-button(
  :size="buttonSize"
  :color="buttonColor"
  :disabled="disabled"
  @click="onClick"
  :plain="plain"
  :class="modifierClass"
)
  template(v-if="icon")
    am-common-img(
      :src="buttonSvg"
      :width="width"
      :height="height"
      :style="styleOption"
    )
  template(v-else)
    span
      | {{ label }}
</template>

<style lang="sass">
.atom-common-button
  &.atom-common-button__with-icon
    border: none
    background: none
</style>
