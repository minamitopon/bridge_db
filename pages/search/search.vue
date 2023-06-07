<script lang="ts" setup>
async function search(query) {
  const { data } = await useFetch("/api/sql/search/search-by-query", {
    method: "POST",
    body: {
      query: query,
    },
  });
}
</script>

<template lang="pug">
.search
  am-common-inner(inner-size="m")
    template(v-slot:content)
      og-search(@search="search")
</template>
