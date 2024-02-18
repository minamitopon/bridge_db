<script lang="ts" setup>
import { ref, reactive, computed, type Ref } from "vue";
import { searchQuery } from "../../../types/front";

/** defines */
const emits = defineEmits<Emits>();
const tab: Ref<string> = ref("simple");
const searchWord: Ref<string> = ref("");
let searchQuery: searchQuery = reactive({
  matchName: "",
  teamName: "",
  playerName: "",
  auction: "",
  hands: "",
});

/** computed */
const disabledSearch = computed(() => {
  return !searchWord.value;
});
const disabledReset = computed(() => {
  return !searchWord.value;
});

/** methods */
const handleUpdateSearchWord = (word) => {
  searchWord.value = word;
};
const updateSearchQuery = (query) => {
  searchQuery = query;
};
const clear = () => {
  searchWord.value = "";
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
  el-tabs(v-model="tab" type="border-card")
    el-tab-pane(label="簡易検索" name="simple")
      mc-simple-search(
        @update:searchWord="handleUpdateSearchWord"
      )
    el-tab-pane(label="詳細検索" name="detailed")
      mc-detail-search(
        @update:searchQuery="updateSearchQuery"
      )
    .og-search-buttons
      atom-common-button(
        size="m"
        color="spade"
        label="検索"
        @click="search"
        :disabled="disabledSearch"
        plain
      )
      atom-common-button(
        size="m"
        color="club"
        label="クリア"
        @click="clear"
        :disabled="disabledReset"
        plain
      )
</template>

<style lang="sass">
.og-search
  .og-search-buttons
    margin-top: 16px
</style>
