<script lang="ts" setup>
interface Props {
  current: number;
  total: number;
}

const Props = withDefaults(defineProps<Props>(), {});
const prevButtonOption = {
  rotate: -90,
};

const nextButtonOption = {
  rotate: 90,
};
</script>

<template lang="pug">
.mc-common-paging
  atom-common-button(
    size="s"
    :width="20"
    :style-option="prevButtonOption"
    icon="spade"
    @click="emitMove('prev')"
    plain
  ).mc-common-paging-count__prev
  .mc-common-paging-count
    span
      | {{ current }}/{{ total }}
  atom-common-button(
    size="s"
    :width="20"
    :style-option="nextButtonOption"
    icon="spade"
    @click="emitMove('next')"
    plain
  ).mc-common-paging-count__next
</template>

<style lang="sass">
.mc-common-paging
  display: flex
  align-items: center
</style>
