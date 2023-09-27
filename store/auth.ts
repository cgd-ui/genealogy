import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuth: localStorage.getItem("isAuth") === "true",
    intendedRoute: null,
    intendedPath: null,
  }),
  actions: {
    login() {
      this.isAuth = true;
      localStorage.setItem("isAuth", true);
    },
    logout() {
      this.isAuth = false;
      localStorage.setItem("isAuth", false);
      localStorage.removeItem("authorization");
    },
    setIntendedRoute(value) {
      state.intendedRoute = value;
    },
    setIntendedPath(value) {
      state.intendedPath = value;
    },
  },
});
