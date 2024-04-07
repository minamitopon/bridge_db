<script lang="ts" setup>
import { HandModel } from "../../../model/HandModel";

interface Props {
  hand: HandModel;
}
/** defines */
const props = defineProps<Props>();
</script>

<template lang="pug">
.match-viewer
  template(v-if="hand")
    mc-match-hand(
      v-for="(hand, index) in hand.allHand"
      :hand="hand"
      :class="`match-viewer-hand__${index}`"
    )
</template>

<style lang="sass">
.match-viewer
  display: grid
  grid-template-columns: repeat(3, 1fr)
  grid-template-rows: repeat(3, 1fr)
  grid-row-gap: 16px
  .match-viewer-hand__north
    grid-area: 1 / 2 / 2 / 3
  .match-viewer-hand__east
    grid-area: 2 / 3 / 3 / 4
  .match-viewer-hand__south
    grid-area: 3 / 2 / 4 / 3
  .match-viewer-hand__west
    grid-area: 2 / 1 / 3 / 2
</style>
