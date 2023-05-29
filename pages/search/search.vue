<script lang="ts" setup>
async function search(query) {
  console.log(query);
}
</script>

<template lang="pug">
.search
  am-common-inner(inner-size="m")
    template(v-slot:content)
      og-search(@search="search")
</template>
