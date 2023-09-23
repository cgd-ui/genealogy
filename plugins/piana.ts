import { useAuthStore } from '~/store/auth.ts'
import { useTestStore } from '~/store/test.ts'

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      store: {
        auth: useAuthStore($pinia),
        test: useTestStore($pinia),
      }
    }
  }
})