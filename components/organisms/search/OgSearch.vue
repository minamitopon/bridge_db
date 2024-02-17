<script lang="ts" setup>
import { ref, reactive, type Ref } from "vue";
import { searchQuery } from "../../../types/front";

/** defines */
const emits = defineEmits<Emits>();
const tab: Ref<string> = ref("simple");
const searchWord = ref("");
let searchQuery: searchQuery = reactive({
  matchName: "",
  teamName: "",
  playerName: "",
  auction: "",
  hands: "",
});

/** methods */
const handleUpdateSearchWord = (word) => {
  searchWord.value = word;
};
const updateSearchQuery = (query) => {
  searchQuery = query;
};

/** emits */
interface Emits {
  (e: "simpleSearch", word: string): void;
  (e: "detailedSearch", query: searchQuery): void;
}
const search = () => {
  if (tab.value === "simple") emits("simpleSearch", searchWord.value);
  else if (tab.value === "detailed") emits("detailedSearch", searchQuery);
};
</script>

<template lang="pug">
.og-search
  v-tabs(v-model="tab")
    v-tab(value="simple")
      | 簡易検索
    v-tab(value="detailed")
      | 詳細検索
  v-window(v-model="tab")
    v-window-item(value="simple")
      mc-simple-search(
        @update:searchWord="handleUpdateSearchWord"
      )
    v-window-item(value="detailed")
      mc-detail-search(
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
