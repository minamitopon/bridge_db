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
import {
  type Match,
  type MatchPlayers,
  type MatchProgress,
} from "../types/front/matchRecord";
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
const progressInView: Ref<MatchProgress[]> = ref([]);

watchEffect(() => {
  uuidsInView.value = matchData.value.map((d) => d.uuid);
});
watch(
  () => [...uuidsInView.value],
  async () => {
    await Promise.all([
      (playersInView.value = await playersStore.fetchByUuids(
        uuidsInView.value
      )),
      (progressInView.value = await progressStore.fetchByUuids(
        uuidsInView.value
      )),
    ]);
  }
);
watch(
  () => [...uuidsInView.value, ...playersInView.value, ...progressInView.value],
  async () => {
    if (
      !proxyToArray(playersInView.value)[0] ||
      !proxyToArray(progressInView.value)[0]
    )
      return;
    vugraphModel.value = matchData.value.map((data) => {
      const player = proxyToArray(playersInView.value)[0].find((player) => {
        return player.uuid === data.uuid;
      });
      const progress = proxyToArray(progressInView.value)[0].find(
        (progress) => {
          return progress.uuid === data.uuid;
        }
      );
      return new matchRecord(data, player, progress);
    });
  }
);

const cols = ref(["auto", "120px", "120px", "auto", "auto"]);

const handleClick = (uuid) => {
  console.log(uuid);
};
</script>

<template lang="pug">
.archive
  .archive__search
    og-search
  .archive__table
    am-common-inner(inner-size="xl")
      template(v-slot:content)
        am-common-table(fixed v-if="vugraphModel")
          colgroup
            col(width="auto")
            col(width="164px")
            col(width="164px")
            col(width="auto")
            col(width="auto")
          thead
            am-common-table-row
              am-common-table-header-cell
                | 試合名
              am-common-table-header-cell
                | チーム１
              am-common-table-header-cell
                | チーム２
              am-common-table-header-cell
                | オープンルーム
              am-common-table-header-cell
                | クローズドルーム
          tbody
            am-common-table-row(
              v-for="match in vugraphModel"
              has-event
              @click="handleClick(match.uuid)"
            )
              am-common-table-cell
                | {{ match.matchName }}
              am-common-table-cell
                | {{ match.teamName.open }}
              am-common-table-cell
                | {{ match.teamName.close }}
              am-common-table-cell
                | {{ match.openRoomPlayers.north }} - {{ match.openRoomPlayers.south }}
                br
                | {{ match.openRoomPlayers.east }} - {{ match.openRoomPlayers.west }}
              am-common-table-cell
                | {{ match.closeRoomPlayers.north }} - {{ match.closeRoomPlayers.south }}
                br
                | {{ match.closeRoomPlayers.east }} - {{ match.closeRoomPlayers.west }}
</template>

<style lang="sass">
.archive
  .archive__search
    width: 800px
    margin: 0 auto 32px 32px
  .archive__table
    width: 1200px
    margin-left: 32px
</style>
