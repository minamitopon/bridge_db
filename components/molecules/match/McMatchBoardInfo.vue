<script lang="ts" setup>
interface Props {
  boardNum: string;
  contract: string;
}
/** defines */
const props = defineProps<Props>();
</script>

<template lang="pug">
.match-board-info
  p # {{ boardNum }}
  p {{ contract }}
</template>

<style lang="sass"></style>
