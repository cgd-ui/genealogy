import { $get, $post } from "actions/fetch.ts";

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      // $get: $get,
      // $post: $post,
    },
  };
});
