<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  size: "s" | "m" | "l";
  color: "spade" | "heart" | "diamond" | "club";
  label: string;
  disable: boolean;
  plain: boolean;
}

const Props = withDefaults(defineProps<Props>(), {
  color: "club",
  plain: true,
  disable: false,
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
  :disable="disable"
  @click="onClick"
)
  | {{ label }}
</template>

<style lang="sass">
.atom-common-button
</style>
