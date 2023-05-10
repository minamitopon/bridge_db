<script lang="ts" setup>
import { ref, computed } from "vue";
import { Search } from "@element-plus/icons-vue";

const input = ref("");

interface Props {
  inputSize: "s" | "m" | "l";
  modelValue: string;
}
const Props = withDefaults(defineProps<Props>(), {
  inputSize: "m",
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
input(
  :value="modelValue"
  @input="inputKey"
  :class="modifierClass"
  placeholder="search"
)
</template>

<style lang="sass">
.input--s
  width: 100px
.input--m
  width: 500px
.input--l
  width: 700px
</style>
