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

import { proxyToArray } from "../utils";

import { type Match, type MatchPlayers } from "../types/front/matchRecord";

import { matchRecord } from "../model/matchRecord";

const matchesStore = useMatchesStore(pinia());
const playersStore = usePlayersStore(pinia());
const progressStore = useProgressStore(pinia());

onMounted(() => {
  Promise.all([matchesStore.fetch()]);
});
const uuidsInView: Ref<string[]> = ref([]);
const playersInView: Ref<MatchPlayers[]> = ref([]);
const matchData = computed(() => reactive(matchesStore.getData));
const vugraphModel: Ref<any[]> = ref([]);

const sample = {
  id: 1,
  uuid: "yerty",
  round: "1-1",
  startBoard: 1,
  lastBoard: 1,
  imp_open: 1,
  imp_close: 1,
};
watchEffect(() => {
  uuidsInView.value = matchData.value.map((d) => d.uuid);
});
watch(
  () => [...uuidsInView.value],
  async (n, p) => {
    playersInView.value = await playersStore.fetchByUuids(uuidsInView.value);
  }
);
watch(
  () => [...playersInView.value],
  async (n, p) => {
    vugraphModel.value = matchData.value.map((data) => {
      const player = proxyToArray(playersInView.value)[0].find((p) => {
        return p.uuid === data.uuid;
      });
      if (!player) return;
      return new matchRecord(data, player, sample);
    });
  }
);

const vugraph = computed(() => {
  const matchData: Match[] = reactive(matchesStore.getData);
  matchData.map((data) => {
    const player = playersInView.value.find((p) => p.uuid === data.uuid);
    if (!player) return;
    return new matchRecord(data, player, sample);
  });
  return matchData;
});

const handleClick = (uuid) => {
  console.log(uuid);
};
</script>

<template lang="pug">
.archive
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
                | {{ match.team_close }}
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
