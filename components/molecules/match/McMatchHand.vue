<script lang="ts" setup>
interface Props {
  hand: any;
}
/** defines */
const props = defineProps<Props>();
const symbol = ["spade", "heart", "diamond", "club"];
</script>

<template lang="pug">
.match-hand
  am-match-suit(
    v-for="(cards, index) in hand"
    :suit="index"
    :cards="cards"
  )
</template>

<style lang="sass"></style>
