<script lang="ts" setup>
interface Props {
  hand: {}[];
}
/** defines */
const props = defineProps<Props>();
</script>

<template lang="pug">
.match-hand
  am-match-suit(
    v-for="suit in hand"
    :suit="suit.symbol"
    :cards="suit.card"
  )
</template>

<style lang="sass"></style>
