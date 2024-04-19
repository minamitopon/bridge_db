<script lang="ts" setup>
import { computed } from "vue";
import { BoardInfoModel } from "../../../model/BoardInfoModel";

interface Props {
  board: BoardInfoModel;
}
/** defines */
const props = withDefaults(defineProps<Props>(), {
  board: () =>
    new BoardInfoModel({
      id: 0,
      uuid: "",
      roomId: "o",
      boardNum: 1,
      auction: "",
      play: "",
      tricks: "",
    }),
});

const adjustedColumn = computed(() => {
  const seat: string[] = ["n", "e", "s", "w"];
  const blankSeats = new Array(seat.indexOf(props.board.dealer)).fill(null);
  return [...blankSeats, ...props.board.auction, ...["p", "p", "p"]];
});
</script>

<template lang="pug">
.match-viewer-auction
  .match-viewer-auction__call(v-for="call in adjustedColumn")
    am-match-call(v-if="call" :call="call")
</template>

<style lang="sass" scoped>
.match-viewer-auction
  width: 244px
  height: 108px
  display: flex
  flex-wrap: wrap
  align-content: flex-start
  overflow-y: scroll
  -ms-overflow-style: none
  scrollbar-width: none
  border: solid 2px #646464
  &::-webkit-scrollbar
    dispaly: none
  .match-viewer-auction__call
    width: 60px
    height: 30px
    display: flex
    justify-content: center
</style>
