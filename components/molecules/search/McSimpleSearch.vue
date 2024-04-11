<script lang="ts" setup>
import { ref, watchEffect, type Ref } from "vue";

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
  am-common-label(
    title="検索ワード"
    bold
  )
    template(v-slot:contents)
      am-common-input(
        input-size="m"
        v-model="searchWord"
        placeholder="試合名、チーム名、プレイヤー名で検索"
      )
</template>
