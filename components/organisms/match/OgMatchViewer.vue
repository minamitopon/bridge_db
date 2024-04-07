<script lang="ts" setup>
import { HandModel } from "../../../model/HandModel";

interface Props {
  hand: HandModel;
}
/** defines */
const props = defineProps<Props>();
const seats = ["north", "east", "south", "west"];
</script>

<template lang="pug">
.match-viewer
  template(v-if="hand")
    mc-match-hand(
      v-for="hand in hand.allHand"
      :hand="hand"
    )
</template>

<style lang="sass"></style>
