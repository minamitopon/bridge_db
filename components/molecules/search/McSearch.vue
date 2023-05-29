<script lang="ts" setup>
import { ref, computed, watchEffect } from "vue";
import { searchQuery } from "../../../types/front";

const matchName = ref("");
const teamName = ref("");
const playerName = ref("");
const auction = ref("");
const hands = ref("");

interface Emits {
  (e: "update:searchQuery", key: searchQuery): void;
}
const emits = defineEmits<Emits>();

const searchQuery = computed(() => {
  return {
    matchName: matchName.value,
    teamName: teamName.value,
    playerName: playerName.value,
    auction: auction.value,
    hands: hands.value,
  };
});

watchEffect(() => {
  emits("update:searchQuery", searchQuery.value);
});
</script>

<template lang="pug">
.molecules-search-inputs
  atom-common-label(
    title="match name"
    bold
  )
    template(v-slot:contents)
      atom-common-input(input-size="m" v-model="matchName")
  atom-common-label(
    title="team name"
    bold
  )
    template(v-slot:contents)
      atom-common-input(input-size="m" v-model="teamName")
  atom-common-label(
    title="player's name"
    bold
  )
    template(v-slot:contents)
      atom-common-input(input-size="m" v-model="playerName")
  atom-common-label(
    title="auction"
    bold
  )
    template(v-slot:contents)
      atom-common-input(input-size="m" v-model="auction")
  atom-common-label(
    title="hands"
    bold
  )
    template(v-slot:contents)
      atom-common-input(input-size="m" v-model="hands")
</template>
