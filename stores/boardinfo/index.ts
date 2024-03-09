import { defineStore } from "pinia";
import { type BoardInfo } from "../../types/backend";
import { BoardInfoModel } from "../../model/BoardInfoModel";

export const useBoardInfoStore = defineStore("boardInfo", {
  state: () => ({
    data: [] as BoardInfoModel[],
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
        const res = await fetch(`/api/sql/boardinfo/findByUuid?uuid=${uuid}`);
        const json = await res.json();
        json.map((j) => new BoardInfoModel(j));
        this.data.push(...json);
      } catch (e) {
        throw new Error(e);
      }
    },
  },
});
