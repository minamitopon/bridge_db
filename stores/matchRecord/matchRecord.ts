import { defineStore, type _GettersTree } from "pinia";
import { type matchRecord } from "../../types/front/index";

export interface interfaceOfMatchRecordState {
  allMatchRecords: matchRecord[];
  narrowedRecord: matchRecord[];
}

export interface interfaceOfMatchRecordGetters
  extends _GettersTree<interfaceOfMatchRecordState> {
  getAllRecord: (state: interfaceOfMatchRecordState) => matchRecord[];
  getNarrowedRecord: (state: interfaceOfMatchRecordState) => matchRecord[];
}

export interface interfaceOfMatchRecordActions {
  searchRecord: (any) => any;
  getAllRecords: () => any;
}

export const useMatchRecordStore = defineStore<
  string,
  interfaceOfMatchRecordState,
  interfaceOfMatchRecordGetters,
  interfaceOfMatchRecordActions
>("matchRecord", {
  state: () => ({
    allMatchRecords: [],
    narrowedRecord: [],
  }),
  getters: {
    getAllRecord: (state) => {
      return state.allMatchRecords;
    },
    getNarrowedRecord: (state) => {
      return state.narrowedRecord;
    },
  },
  actions: {
    async searchRecord(conditions) {
      const { data: result } = await useFetch("/api/sql/search/search-match", {
        method: "POST",
        body: {
          contents: conditions,
        },
      });
      this.narrowedRecord = JSON.parse(result.value);
    },
    async getAllRecords() {
      const { data: result } = await useFetch("/api/match-record");
      this.allMatchRecords = result.value;
    },
  },
});
