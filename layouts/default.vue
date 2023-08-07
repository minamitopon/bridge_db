<template lang="pug">
.default-layout
  header.default-layout__header
    | test
  client-only.default-layout__sidebar
    og-common-sidebar
  main.default-layout__main
    slot
</template>

<style lang="sass" scoped>
.default-layout
  height: 100vh
  display: grid
  grid-template-columns: 200px 1fr 1fr
  grid-template-rows: 80px repeat(4, 1fr)
  grid-column-gap: 0px
  grid-row-gap: 0px
  .default-layout__header
    grid-area: 1 / 1 / 2 / 6
  .default-layout__sidebar
    grid-area: 2 / 1 / 6 / 2
  .default-layout__main
    grid-area: 2 / 2 / 6 / 6
</style>
