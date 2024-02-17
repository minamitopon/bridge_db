<script lang="ts" setup>
import { ref, computed, watchEffect, Ref } from "vue";
import { searchQuery } from "../../../types/front";

const searchWord: Ref<string> = ref("");

interface Emits {
  (e: "update:searchWord", key: string): void;
}
const emits = defineEmits<Emits>();

watchEffect(() => {
  emits("update:searchWord", searchWord.value);
});
</script>

<template lang="pug">
.molecules-search-inputs
  atom-common-label(
    title="検索ワード"
    bold
  )
    template(v-slot:contents)
      atom-common-input(input-size="m" v-model="matchName")
</template>
