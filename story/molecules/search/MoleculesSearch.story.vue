<script lang="ts" setup>
import AtomCommonLabel from "../../../components/atom/common/AtomCommonLabel.vue";
import AtomCommonInput from "../../../components/atom/common/AtomCommonInput.vue";
import { ref, computed, watchEffect } from "vue";
import { searchQuery } from "../../../types/front";

interface Emits {
  (e: "update:searchQuery", key: searchQuery): void;
}
const emits = defineEmits<Emits>();

const matchName = ref("");
const teamName = ref("");
const playerName = ref("");
const auction = ref("");
const hands = ref("");

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
story(title="molecules/search/MoleculesSearch")
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
