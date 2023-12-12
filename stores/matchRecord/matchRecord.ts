import { defineStore } from "pinia";
export const useMatchesStore = defineStore("matches", {
  state: () => ({
    data: null,
  }),
  getters: {
    data: (state) => state.data,
  },
  actions: {
    async fetch() {
      const { data: result } = await useFetch("api/sql/match");
      this.data = result;
    },
  },
});
