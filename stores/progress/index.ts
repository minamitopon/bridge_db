import { defineStore } from "pinia";

export const useProgressStore = defineStore("progress", {
  state: () => ({
    data: [],
    requested: [],
  }),
  getters: {
    getData: (state) => state.data,
  },
  actions: {
    async findByUuid(uuid) {
      try {
        if (this.requested.indexOf(uuid)) {
          return this.data.find((d) => d.uuid === uuid);
        }
        const res = await fetch(`/api/sql/progress/findByUuid?uuid=${uuid}`);
        const json = await res.json();
        this.data = json;
      } catch (e) {
        throw new Error(e);
      }
    },
    async fetchByUuids(uuids: string[]) {
      try {
        if (uuids) {
          const res = await fetch("/api/sql/progress/findByUuids", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(uuids),
          });
          const json = await res.json();
          this.data = json;

          return json;
        }
      } catch (e) {
        console.log(e);
        throw new Error();
      }
    },
  },
});
