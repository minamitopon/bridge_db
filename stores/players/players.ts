import { defineStore } from "pinia";
import { MatchPlayers } from "../../types/front/matchRecord";

export const usePlayersStore = defineStore("players", {
  state: () => ({
    data: [] as MatchPlayers[],
  }),
  getters: {
    getData: (state) => state.data,
    findByUuid: (state) => (uuid) => {
      return state.data.find((d) => d.uuid === uuid);
    },
  },
  actions: {
    async fetchByUuids(uuids: string[]) {
      try {
        if (uuids) {
          const res = await fetch("/api/sql/players/players", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(uuids),
          });
          const json = await res.json();
          this.data = json;

          return this.data;
        }
      } catch (e) {
        console.log(e);
        throw new Error();
      }
    },
  },
});
