<script lang="ts" setup>
import { computed } from "vue";
import { Suit } from "../../../enums/suit";

interface Props {
  call: string;
}
/** defines */
const props = defineProps<Props>();

const srcOfSymbol = computed(() => {
  let path;
  switch (props.call[1]) {
    case "C":
      path = `/images/atom/${Suit.CLUB}.svg`;
      break;
    case "D":
      path = `/images/atom/${Suit.DIAMOND}.svg`;
      break;
    case "H":
      path = `/images/atom/${Suit.HEART}.svg`;
      break;
    case "S":
      path = `/images/atom/${Suit.SPADE}.svg`;
      break;
    default:
      path = ``;
      break;
  }
  return path;
});
const declaration = computed(() => props.call[0]);
const isNt = computed(() => props.call[1] === "N");
const isPass = computed(() => props.call[0] === "p");
const isDouble = computed(() => props.call[0] === "d");
const isRedouble = computed(() => props.call[0] === "r");
</script>

<template lang="pug">
.match-call
  template(v-if="isNt")
    span.match-call__call
      | {{ declaration }}NT
  template(v-else-if="isPass")
    span.match-call__call
      | P
  template(v-else-if="isDouble")
    span.match-call__call
      | X
  template(v-else-if="isRedouble")
    span.match-call__call
      | XX
  template(v-else)
    span.match-call__call
      | {{ declaration }}
    am-common-img(
      :src="srcOfSymbol"
      :width="18"
      :height="18"
    )
</template>

<style lang="sass">
.match-call
  display: flex
  gap: 4px
  align-items: center
  .match-call__call
    font-size: 18px
</style>
