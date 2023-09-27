import { defineStore } from "pinia";

export const useLayoutStore = defineStore("layout", {
  state: () => ({
    home: true,
    themes: {},
    lightsOff: false,
    isMobile: false,
    isTablet: false,
    isTouch: false,
    footer: true,
  }),
  actions: {
    home(status) {
      this.home = status;
    },
    setThemes(themes) {
      this.themes = themes;
    },
    toggleLights() {
      this.lightsOff = !state.lightsOff;
    },
    setIsMobile(isMobile) {
      this.isMobile = isMobile;
    },
    setIsTablet(isTablet) {
      this.isTablet = isTablet;
    },
    setIsTouch(isTouch) {
      this.isTouch = isTouch;
    },
    hideFooter() {
      this.footer = false;
    },
    showFooter() {
      this.footer = true;
    },
  },
});
