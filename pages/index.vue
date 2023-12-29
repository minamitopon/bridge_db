<script lang="ts" setup>
import { onMounted } from "vue";
import pinia from "../stores/index";
import { useMatchesStore } from "../stores/matchRecord/matchRecord";

const store = useMatchesStore(pinia());

onMounted(async () => {
  await store.fetch();
});
</script>

<template lang="pug">
.root
  p {{ store.data }}
</template>

<style lang="sass"></style>
