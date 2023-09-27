import { defineStore } from "pinia";

export const useMaintStore = defineStore("main", {
  state: () => ({
    appState: false,
    appUpdate: false,
    enums: {},
    guestState: false,
    impersonating: null,
    meta: {},
    pageTitle: null,
    requests: [],
    routes: {},
    showQuote: false,
    user: {},
  }),
  getters: {
    _routes: (state) => Object.keys(state.routes),
    _isWebview: () => typeof ReactNativeWebView !== "undefined",
    _requests: (state) => state.requests.length,
    _loggedInUser: (state) => state.user,
    _requestIndex:
      (state) =>
      ({ url, method }) =>
        state.requests.findIndex(
          (request) => method === request.method && url === request.url
        ),
  },
  actions: {
    addRequest({ method, url }) {
      this.requests.push({ method, url });
    },
    appState(value) {
      this.appState = value;
    },
    guestState(value) {
      this.guestState = value;
    },
    newRelease() {
      this.appUpdate = true;
    },
    removeRequest(index) {
      this.requests.splice(index, 1);
    },
    setCsrfToken({ token, $axios }) {
      this.meta.csrfToken = token;
      $axios.defaults.withCredentials = true;
      $axios.defaults.headers.common["X-XSRF-TOKEN"] = token;
      window.Laravel = { csrfToken: token };
    },
    setDefaultRoute({ route, _router }) {
      _router.addRoute({
        path: "/dashboard",
        redirect: { name: route },
      });
    },
    setEnums(enums) {
      this.enums = enums;
    },
    setImpersonating(impersonating) {
      this.impersonating = impersonating;
    },
    setMeta(meta) {
      this.meta = meta;
    },
    setPageTitle(title) {
      this.pageTitle = title;
    },
    setRoutes(routes) {
      this.routes = routes;
    },
    setShowQuote(value) {
      this.showQuote = !!value;
    },
    setUser(user) {
      this.user = user;
      console.log(this.user);
    },
    setUserAvatar(avatarId) {
      this.user.avatar.id = avatarId;
    },
  },
});
