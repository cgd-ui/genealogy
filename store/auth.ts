import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuth: localStorage.getItem("isAuth") === "true",
    intendedRoute: null,
    intendedPath: null,
  }),
  actions: {
    logout({ commit }) {
      // `this` is the store instance
      //   this.counter++
    },
  },
});
