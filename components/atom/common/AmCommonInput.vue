<script lang="ts" setup>
import { ref, computed } from "vue";
import { Search } from "@element-plus/icons-vue";

const input = ref("");

interface Props {
  inputSize: "s" | "m" | "l";
  modelValue: string;
  placeholder: string;
}
const Props = withDefaults(defineProps<Props>(), {
  inputSize: "m",
  placeholder: "検索ワード",
});

interface Emits {
  (e: "update:modelValue", key: string): void;
}
const emits = defineEmits<Emits>();

const modifierClass = computed(() => {
  return `input--${Props.inputSize}`;
});

const inputKey = (e) => {
  const target = e.target as HTMLInputElement;
  emits("update:modelValue", target.value);
};
</script>

<template lang="pug">
input.am-common-input(
  :value="modelValue"
  @input="inputKey"
  :class="modifierClass"
  :placeholder="placeholder"
)
</template>

<style lang="sass">
.am-common-input
  padding: 3px 5px
  border: solid 2px #646464
  border-radius: 5px
  font-size: 16px
  &.input--s
    width: 100px
  &.input--m
    width: 500px
  &.input--l
    width: 700px
</style>
