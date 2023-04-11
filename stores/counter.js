import { defineStore, storeToRefs } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({ count: 1, name: "counter" }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
  persist: {
    // By default Persisted States is saved in cookies if storage is not mentioned
    key: "hahaha",
    storage: persistedState.localStorage,
  },
});

export function useCounterStoreRefs() {
  const { count, name, doubleCount } = useCounterStore();
  return storeToRefs({ count, name, doubleCount });
}
