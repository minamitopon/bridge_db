<script lang="ts" setup>
import { ref, computed, watchEffect, watch } from "vue";
import { handKeyword } from "../../../types/front";

const spades = ref("");
const hearts = ref("");
const diamonds = ref("");
const clubs = ref("");
const hands = ref("");

interface Emits {
  (e: "update:handKeyword", key: handKeyword): void;
}
const emits = defineEmits<Emits>();
const inputTitles = [
  "スペードの持ち方",
  "ハートの持ち方",
  "ダイヤの持ち方",
  "クラブの持ち方",
  "あいまい検索",
];
const handKeyword = computed<handKeyword>(() => {
  return {
    spades: spades.value,
    hearts: hearts.value,
    diamonds: diamonds.value,
    clubs: clubs.value,
    hands: hands.value,
  };
});
watchEffect(() => {
  emits("update:handKeyword", handKeyword.value);
});
</script>

<template lang="pug">
.molecules-search-hands
  atom-common-label(
    :title="inputTitles[0]"
    bold
    font-size="m"
    label-position="left"
  )
    template(v-slot:contents)
      atom-common-input(input-size="m" v-model="spades")
  atom-common-label(
    :title="inputTitles[1]"
    bold
    font-size="m"
    label-position="left"
  )
    template(v-slot:contents)
      atom-common-input(input-size="m" v-model="hearts")
  atom-common-label(
    :title="inputTitles[2]"
    bold
    font-size="m"
    label-position="left"
  )
    template(v-slot:contents)
      atom-common-input(input-size="m" v-model="diamonds")
  atom-common-label(
    :title="inputTitles[3]"
    bold
    font-size="m"
    label-position="left"
  )
    template(v-slot:contents)
      atom-common-input(input-size="m" v-model="clubs")
  atom-common-label(
    :title="inputTitles[4]"
    bold
    font-size="m"
    label-position="left"
  )
    template(v-slot:contents)
      atom-common-input(input-size="m" v-model="hands")
</template>
