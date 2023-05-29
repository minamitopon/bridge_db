<script lang="ts" setup>
import { reactive } from "vue";
import { searchQuery } from "../../../types/front";

let searchQuery: searchQuery = reactive({
  matchName: "",
  teamName: "",
  playerName: "",
  auction: "",
  hands: "",
});
const updateSearchQuery = (query) => {
  searchQuery = query;
};
interface Emits {
  (e: "search", query: searchQuery): void;
}
const emits = defineEmits<Emits>();
const search = () => {
  emits("search", searchQuery);
};
</script>

<template lang="pug">
.og-search
  mc-search(
    @update:searchQuery="updateSearchQuery"
  )
  atom-common-button(
    size="s"
    color="heart"
    label="search"
    @click="search"
    plain
  )
</template>
