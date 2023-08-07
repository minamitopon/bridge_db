<script lang="ts" setup>
import { reactive } from "vue";
let handKeyword = reactive({});
const updateHandKeyword = (key) => {
  handKeyword = key;
};
interface Emits {
  (e: "search", query: {}): void;
}
const emits = defineEmits<Emits>();
const search = () => {
  console.log("cl");
  emits("search", handKeyword);
};
</script>

<template lang="pug">
.og-search
  mc-search-hands(
    @update:handKeyword="updateHandKeyword"
  )
  atom-common-button(
    size="s"
    color="heart"
    label="search"
    @click="search"
    plain
    :disable="false"
  )
</template>
