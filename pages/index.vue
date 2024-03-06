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
import { type searchQuery } from "../types/front";
import { matchRecord } from "../model/matchRecord";

/** store */
const matchesStore = useMatchesStore(pinia());
const playersStore = usePlayersStore(pinia());
const progressStore = useProgressStore(pinia());

onMounted(() => {
  Promise.all([matchesStore.fetch()]);
});

/** defines */
const cols = ref(["auto", "100px", "100px", "auto", "auto"]);
const uuidsInView: Ref<string[]> = ref([]);
const playersInView: Ref<MatchPlayers[]> = ref([]);
const progressInView: Ref<MatchProgress[]> = ref([]);
const matchData = computed(() => reactive(matchesStore.getData));
const initialVugraphModel: Ref<matchRecord[]> = ref([]);
const searchResult: Ref<matchRecord[]> = ref([]);
const vugraphModel: Ref<matchRecord[]> = ref([]);

/** watch */
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
    initialVugraphModel.value = matchData.value.map((data) => {
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
    vugraphModel.value = initialVugraphModel.value;
  }
);

/** methods */
const handleClick = (uuid) => {
  console.log(uuid);
};
const handleSimpleSearch = async (keyword) => {
  const { data: result } = await useFetch("/api/sql/search/simple-search", {
    query: { keyword: keyword },
  });
  vugraphModel.value = JSON.parse(result.value).map((datum) => {
    const info: Match = {
      uuid: datum.uuid,
      name: datum.name,
      team_open: datum.team_open,
      team_close: datum.team_close,
    };
    const players: MatchPlayers = {
      uuid: datum.uuid,
      north_open: datum.north_open,
      east_open: datum.east_open,
      south_open: datum.south_open,
      west_open: datum.west_open,
      north_close: datum.north_close,
      east_close: datum.east_close,
      south_close: datum.south_close,
      west_close: datum.west_close,
    };
    const progress: MatchProgress = {
      uuid: datum.uuid,
      round: datum.round,
      startBoard: datum.startBoard,
      lastBoard: datum.lastBoard,
      imp_open: datum.imp_open,
      imp_close: datum.imp_close,
    };
    return new matchRecord(info, players, progress);
  });
};
const handleDetailedSearch = async (query: searchQuery) => {
  const { data: result } = await useFetch("/api/sql/search/detailed-search", {
    query: {
      match_name: query.match_name,
      team_name: query.team_name,
      player_name: query.player_name,
      auction: query.auction,
      hands: query.hands,
    },
  });
  vugraphModel.value = JSON.parse(result.value).map((datum) => {
    return new matchRecord(
      datum.info,
      datum.players,
      datum.progress,
      datum.board
    );
  });
};
</script>

<template lang="pug">
.archive
  .archive__search
    og-search(
      @simple-search="handleSimpleSearch"
      @detailed-search="handleDetailedSearch"
    )
  .archive__table
    am-common-inner(inner-size="l")
      template(v-slot:content)
        am-common-table(fixed)
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
              :key="match.uuid"
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
