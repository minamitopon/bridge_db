<script lang="ts" setup>
import { ref, computed } from "vue";
import { Search } from "@element-plus/icons-vue";

const input = ref("");

interface Props {
  inputSize: "s" | "m" | "l";
}
const Props = withDefaults(defineProps<Props>(), {
  inputSize: "m",
});

interface Emits {
  (e: "clickSearch", key: string): void;
}
const emits = defineEmits<Emits>();

const clickSearch = () => {
  emits("clickSearch", input.value);
};

const modifierClass = computed(() => {
  return `input--${Props.inputSize}`;
});
</script>

<template lang="pug">
.input(:class="modifierClass")
  el-input(v-model="input" placeholder="search")
    template(#prepend)
      el-button(:icon="Search" @click="clickSearch")
</template>

<style lang="sass">
.input--s
  width: 100px
.input--m
  width: 500px
.input--l
  width: 700px
</style>
