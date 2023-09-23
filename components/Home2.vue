<template>
  <div>sample</div>
</template>
<script>

export default {
    name:"Home",
    meta: {
        guestGuard: true,
        title: 'Landing Page'
    },
    data() {
        console.log(this.$store)
        const isAuth = computed(() => this.$store.auth.isAuth)
        return {
            isDark: false,
            isClear: true,
            isAuth: isAuth,
        };
    },
    // computed: {
    //   isAuth: this.$store.auth.isAuth,
    // },
    methods: {
        // ...mapActions('auth', ['logout']),
        async logoutAccount() {
            await this.logout();
            // setTimeout(() => {
            //     this.$router.push('/')
            // }, 500)
        },

        handleScroll() {
            if (window.scrollY >= 10) {
                this.isClear = false;
                this.isDark = true;
            } else {
                this.isClear = true;
                this.isDark = false;
            }
        },
    },
}
</script>

<style scoped>
@import "~/assets/css/base.css";
@media screen and (max-width: 1006px) {
  .navbar.is-fixed-top {
    display: inline !important;
  }
}

#home {
  background: url("~/assets/images/main-hero.webp") #4fcf8d no-repeat;
}
</style>
