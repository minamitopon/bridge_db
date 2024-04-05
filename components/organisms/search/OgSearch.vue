<script lang="ts" setup>
import { ref, reactive, computed, type Ref } from "vue";
import { searchQuery } from "../../../types/front";

/** defines */
const emits = defineEmits<Emits>();
const tab: Ref<string> = ref("simple");
const searchWord: Ref<string> = ref("");
const searchQuery: Ref<searchQuery> = ref({
  match_name: "",
  team_name: "",
  player_name: "",
  auction: "",
  hands: "",
});

/** computed */
const disabledSimpleSearch = computed(() => {
  return !searchWord.value;
});
const disabledDetailSearch = computed(() => {
  return !Object.keys(searchQuery.value).some((key) => {
    return searchQuery.value[key];
  });
});

/** methods */
const handleUpdateSearchWord = (word) => {
  searchWord.value = word;
};
const updateSearchQuery = (query) => {
  searchQuery.value = query;
};
const clearSearchWord = () => {
  searchWord.value = "";
};
const clearSearchQuery = () => {
  Object.keys(searchQuery.value).map((key) => searchQuery.value[key] === "");
};

/** emits */
interface Emits {
  (e: "simpleSearch", word: string): void;
  (e: "detailedSearch", query: searchQuery): void;
}
const search = () => {
  emits("simpleSearch", searchWord.value);
};
const detailSearch = () => {
  emits("detailedSearch", searchQuery.value);
};
</script>

<template lang="pug">
.og-search
  el-tabs(v-model="tab" type="border-card")
    el-tab-pane(label="簡易検索" name="simple")
      mc-simple-search(
        @update:searchWord="handleUpdateSearchWord"
      )
      .og-search-buttons
        am-common-button(
          size="m"
          color="spade"
          label="検索"
          @click="search"
          :disabled="disabledSimpleSearch"
          plain
        )
        am-common-button(
          size="m"
          color="club"
          label="クリア"
          @click="clearSearchWord"
          :disabled="disabledSimpleSearch"
          plain
        )
    el-tab-pane(label="詳細検索" name="detailed")
      mc-detail-search(
        @update:searchQuery="updateSearchQuery"
      )
      .og-search-buttons
        am-common-button(
          size="m"
          color="spade"
          label="詳細検索"
          @click="detailSearch"
          :disabled="disabledDetailSearch"
          plain
        )
        am-common-button(
          size="m"
          color="club"
          label="クリア"
          @click="clearSearchQuery"
          :disabled="disabledDetailSearch"
          plain
        )
</template>

<style lang="sass">
.og-search
  .og-search-buttons
    margin-top: 16px
</style>
