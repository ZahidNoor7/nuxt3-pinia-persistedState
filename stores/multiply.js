import { defineStore, storeToRefs } from "pinia";

export const useMultiplyStore = defineStore("multiply", {
  state: () => ({ count: 1, name: "multiply" }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    multi(value) {
      debugger;
      this.count *= value;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});

export function useMultiplyStoreRefs() {
  const { count, name, doubleCount } = useMultiplyStore();
  return storeToRefs({ count, name, doubleCount });
}
