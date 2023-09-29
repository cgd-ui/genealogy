<template>
  <register-form
    action="Register"
    route="register"
    @success="init"
  ></register-form>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useMaintStore, useAuthStore, useLayoutStore } from "~/store";
import Errors from "@enso-ui/laravel-validation";
import RegisterForm from "~/components/auth/RegisterForm.vue";
// import Email from '~/components/auth/fields/Email.vue';
// import Password from '~/components/auth/fields/Password.vue';
// import Remember from '~/components/auth/fields/Remember.vue';
import { $get, $post } from "actions/index.ts";

export default {
  meta: {
    guestGuard: true,
    title: "Register",
  },
  components: { RegisterForm },
  setup() {
    definePageMeta({
      layout: "index",
    });
  },
  data: () => ({
    errors: new Errors(),
    payload: {
      email: "",
      password: "",
      remember: false,
    },
  }),

  computed: {
    ...mapState(useMaintStore, ["meta", "_isWebview"]),
  },

  methods: {    
    ...mapActions(useMaintStore, ["setShowQuote", "setCsrfToken"]),
    ...mapActions(useAuthStore, ["login"]),
    ...mapActions(useLayoutStore, ["home"]),
    init(data) {
      this.setShowQuote(this.meta.showQuote);

      if (data.csrfToken) {
        this.setCsrfToken({ token: data.csrfToken, $axios: this.$axios });
      }
      setTimeout(() => {
        if (data.plan_id != "") {
          this.$router.push({
            path: "/planDetail?price=" + data.plan_id + "&id=" + data.id,
            params: {
              price: data.plan_id,
              id: data.id,
            },
          });
        } else {
          this.$router.push("/login");
        }
      }, 500);
    },
  },
};
</script>
