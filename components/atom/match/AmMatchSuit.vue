<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  suit: string;
  cards: string;
}
/** defines */
const props = defineProps<Props>();

const srcOfSymbol = computed(() => {
  return `/assets/images/atom/${props.suit}.svg`;
});
</script>

<template lang="pug">
.match-suit
  .match-suit__symbol
    am-common-img(
      :src="srcOfSymbol"
      :width="20"
      :height="20"
    )
  .match-suit__cards
    | {{ cards }}
</template>

<style lang="sass"></style>
