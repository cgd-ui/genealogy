<template>
  <login-form action="Login" route="login" @success="init" />
</template>
<script>

import { mapActions, mapState } from "pinia";
import Errors from "@enso-ui/laravel-validation";
import { useMaintStore, useAuthStore, useLayoutStore } from "~/store";

import LoginForm from '~/components/auth/LoginForm.vue';

export default {
 
  meta: {
    guestGuard: true,
    title: "Login",
  },

  components: { LoginForm },
  setup() {

    definePageMeta({
      layout: "index",
    });

  },
  data() {
    return {
      errors: new Errors(),
      payload: {
        email: "",
        password: "",
        remember: false,
      },
    };
  },

  computed: {
    ...mapState(useMaintStore, ["meta"]),
  },
  methods: {
    ...mapActions(useMaintStore, ["setShowQuote", "setCsrfToken"]),
    ...mapActions(useAuthStore, ["login"]),
    ...mapActions(useLayoutStore, ["home"]),
    init(data) {
      this.setShowQuote(this.meta.showQuote);
      if (data?.csrfToken) {
        this.setCsrfToken({ token: data.csrfToken, $axios: this.$axios });
      }

      setTimeout(() => {
        if (data.role_id == 4) {
          this.$router.push("/subscription");
        } else {
          this.$router.push("/dashboard");
        }
        this.login();
        this.home(true);
      }, 500);
    },
  },
};
</script>
