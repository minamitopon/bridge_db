<script lang="ts" setup>
import { ref } from "vue";
const conditon = ref("");
interface Emits {
  (e: "search", conditon: String): void;
}
const emits = defineEmits<Emits>();
const search = () => {
  emits("search", conditon.value);
};
</script>

<template lang="pug">
.og-search
  am-common-label
    template(v-slot:contents)
      am-common-input(input-size="m" v-model="conditon")
  am-common-button(
    size="s"
    color="heart"
    label="search"
    @click="search"
    plain
    :disable="false"
  )
</template>
