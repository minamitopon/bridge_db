<script lang="ts" setup>
import { ref, computed, mergeProps } from "vue";
import { type imgOptions } from "../../../types/front/index";

interface Props {
  src: string;
  width?: number;
  height?: number;
  style?: imgOptions;
}
const Props = withDefaults(defineProps<Props>(), {});

const modifierStyle = computed(() => {
  return {
    ...(Props.style?.rotate && {
      transform: `rotate(${Props.style?.rotate}deg)`,
    }),
  };
});
</script>

<template lang="pug">
.mc-common-svg
  img(
    :src="src"
    :width="width"
    :height="height"
    :style="modifierStyle"
  )
</template>

<style lang="sass"></style>
