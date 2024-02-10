<script lang="ts" setup>
import {
  onMounted,
  computed,
  reactive,
  ref,
  watchEffect,
  watch,
  type Ref,
} from "vue";
import pinia from "../stores/index";
import { useMatchesStore } from "../stores/matchRecord/matchRecord";
import { usePlayersStore } from "../stores/players/players";
import { useProgressStore } from "../stores/progress/index";
import { type Match } from "../types/front/matchRecord";

import { matchRecord } from "../model/matchRecord";

const matchesStore = useMatchesStore(pinia());
const playersStore = usePlayersStore(pinia());
const progressStore = useProgressStore(pinia());

onMounted(() => {
  Promise.all([matchesStore.fetch()]);
});
const uuidsInView: Ref<string[]> = ref([]);
const matchData = computed(() => reactive(matchesStore.getData));

watchEffect(() => {
  uuidsInView.value = matchData.value.map((d) => d.uuid);
});
watch(
  () => [...uuidsInView.value],
  async (n, p) => {
    const players = await playersStore.fetchByUuids(uuidsInView.value);
  }
);

const vugraph = computed(() => {
  const matchData: Match[] = reactive(matchesStore.getData);
  matchData.map((data) => {
    const players = ref(playersStore.findByUuid(data.uuid));
    return;
  });
  return matchData;
});

const handleClick = (uuid) => {
  console.log(uuid);
};
</script>

<template lang="pug">
.archive
  p {{ uuidsInView }}
  .archive__search
    og-search
  .archive__table
    am-common-inner(inner-size="m")
      template(v-slot:content)
        am-common-table(fixed v-if="vugraph")
          colgroup
            col(v-for="col in cols" :width="col")
          thead
            am-common-table-row
              am-common-table-header-cell
                | 試合名
              am-common-table-header-cell
                | チーム１
              am-common-table-header-cell
                | チーム２
          tbody
            am-common-table-row(
              v-for="match in vugraph"
              has-event
              @click="handleClick(match.uuid)"
            )
              am-common-table-cell
                | {{ match.name }}
              am-common-table-cell
                | {{ match.team_open }}
              am-common-table-cell
                | {{ match.team_close }}
</template>

<style lang="sass">
.archive
  .archive__search
    width: 800px
    margin: 0 auto 32px 32px
  .archive__table
    width: 800px
    margin-left: 32px
</style>
