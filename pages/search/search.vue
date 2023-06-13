<script lang="ts" setup>
async function search(query) {
  const { data: res } = await useFetch("/api/sql/search/search-match", {
    method: "POST",
    body: {
      contents: query,
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
