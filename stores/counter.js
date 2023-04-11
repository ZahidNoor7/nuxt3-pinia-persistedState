import axios from "axios";
import { defineStore, storeToRefs } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({ count: 1, name: "counter", users: [], data: [] }),
  getters: {
    doubleCount: (state) => state.count * 2,
    getUsers: (state) => state.users,
  },
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    setData(res) {
      debugger;
      this.data = res;
    },
    async fetchUsers() {
      try {
        const data = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        this.users = data.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
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
  return storeToRefs({ count, name, doubleCount, getUsers });
}
