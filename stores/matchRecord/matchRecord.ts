import { defineStore } from "pinia";
import { Match } from "../../types/front/matchRecord";

export const useMatchesStore = defineStore("matches", {
  state: () => ({
    data: [] as Match[],
  }),
  getters: {
    getData: (state) => state.data,
  },
  actions: {
    async fetch() {
      try {
        const res = await fetch("/api/sql/match");
        const json = await res.json();
        this.data = json;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
});
