<script lang="ts" setup>
import { ref, computed, watchEffect } from "vue";
import { searchQuery } from "../../../types/front";

const match_name = ref("");
const team_name = ref("");
const player_name = ref("");
const auction = ref("");
const hands = ref("");

interface Emits {
  (e: "update:searchQuery", key: searchQuery): void;
}
const emits = defineEmits<Emits>();

const searchQuery = computed(() => {
  return {
    match_name: match_name.value,
    team_name: team_name.value,
    player_name: player_name.value,
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
    title="試合名"
    bold
  )
    template(v-slot:contents)
      atom-common-input(input-size="m" v-model="match_name")
  atom-common-label(
    title="チーム名"
    bold
  )
    template(v-slot:contents)
      atom-common-input(input-size="m" v-model="team_name")
  atom-common-label(
    title="プレイヤー名"
    bold
  )
    template(v-slot:contents)
      atom-common-input(input-size="m" v-model="player_name")
  atom-common-label(
    title="オークション"
    bold
  )
    template(v-slot:contents)
      atom-common-input(input-size="m" v-model="auction" desabled)
  atom-common-label(
    title="ハンド"
    bold
  )
    template(v-slot:contents)
      atom-common-input(input-size="m" v-model="hands")
</template>
