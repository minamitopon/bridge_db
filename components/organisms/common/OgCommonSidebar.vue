<script lang="ts" setup>
const route = useRoute();

const items = [
  { label: "アーカイブ", to: "/" },
  { label: "試合検索", to: "/search/match" },
  { label: "オークション検索", to: "/search/auctions" },
  { label: "ハンド検索", to: "/search/hands" },
];

const isActive = (path) => {
  return route.path === path;
};
</script>

<template lang="pug">
.og-common-sidebar
  .og-common-sidebar__contents
    .og-common-sidebar__item(v-for="item in items" :class="isActive(item.to) ? 'og-common-sidebar__item-active' : ''")
      nuxt-link(:to="item.to")
        | {{ item.label }}
</template>

<style lang="sass">
.og-common-sidebar
  padding: 16px 8px
  .og-common-sidebar__item
    margin-bottom: 8px
    padding: 8px 4px
    border-bottom: solid 2px #646464
    &-active
      border-left: solid 6px #9dbdbb
    &:hover
      cursor: pointer
      border-left: solid 6px #9dbdbb
</style>
