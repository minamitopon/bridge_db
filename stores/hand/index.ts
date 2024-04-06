import { defineStore } from "pinia";
import { handModel } from "../../model/handModel";

export const useHandStore = defineStore("hand", {
  state: () => ({
    data: [] as handModel[],
    cache: [] as string[],
  }),
  getters: {
    findByUuid: (state) => (uuid) => {
      return state.data.filter((d) => d.uuid === uuid);
    },
  },
  actions: {
    async fetchByUuid(uuid: string) {
      try {
        if (this.cache.includes(uuid)) return;
        const res = await fetch(`/api/sql/hand/findByUuid?uuid=${uuid}`);
        const json = await res.json();
        json.map((j) => new handModel(j));
        this.data.push(...json);
      } catch (e) {
        throw new Error(e);
      }
    },
  },
});
