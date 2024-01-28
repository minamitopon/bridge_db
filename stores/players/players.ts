import { defineStore } from "pinia";
export const usePlayersStore = defineStore("players", {
  state: () => ({
    data: [],
  }),
  getters: {
    getData: (state) => state.data,
  },
  actions: {
    async fetch() {
      try {
        const res = await fetch(
          "/api/sql/players/players?uuid=72ef48c2-984e-492d-96d6-8020657f4c24"
        );
        const json = await res.json();
        this.data = json;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
});
