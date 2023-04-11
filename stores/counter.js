export const useCounterStore = defineStore("counter", {
  state: () => ({ count: 0, name: "counter" }),
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
    storage: persistedState.localStorage,
  },
});
