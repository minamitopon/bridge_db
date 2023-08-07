<script lang="ts" setup>
import { ref, computed, watchEffect } from "vue";
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
const inputModels = [
  {
    title: "スペードの持ち方",
    model: spades,
  },
  {
    title: "ハートの持ち方",
    model: hearts.value,
  },
  {
    title: "ダイヤの持ち方",
    model: diamonds.value,
  },
  {
    title: "クラブの持ち方",
    model: clubs.value,
  },
  {
    title: "あいまい検索",
    model: hands.value,
  },
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
    v-for="model in inputModels"
    :title="model.title"
    bold
    font-size="m"
    label-position="left"
  )
    template(v-slot:contents)
      atom-common-input(input-size="m" v-model="model.model")
</template>
