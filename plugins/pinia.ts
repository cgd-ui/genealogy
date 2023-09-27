import { useMaintStore, useAuthStore, useLayoutStore } from "~/store";

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      store: {
        main: useMaintStore($pinia),
        auth: useAuthStore($pinia),
        layout: useLayoutStore($pinia),
      },
    },
  };
});
