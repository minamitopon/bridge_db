<script lang="ts" setup>
interface Props {
  hands: [];
}
/** defines */
const props = defineProps<Props>();
</script>

<template lang="pug">
.match-viewer
  mc-match-hand(
    v-for="hand in hands"
    :hand="hand"
  )
</template>

<style lang="sass"></style>
