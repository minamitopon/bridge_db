import { defineStore } from "pinia";
import { HandModel } from "../../model/HandModel";

export const useHandStore = defineStore("hand", {
  state: () => ({
    data: [] as HandModel[],
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
        json.map((j) => new HandModel(j));
        this.data.push(...json);
        this.cache.push(uuid);
      } catch (e) {
        throw new Error(e);
      }
    },
  },
});
