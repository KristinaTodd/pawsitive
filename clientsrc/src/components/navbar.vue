<template>
  <nav class=" navbar navbar-expand-lg navbar-light bg-info justify-content-space-between">
    <img class="logo" src="../assets/Black-logo.png" />
    <router-link class="name navbar-brand " :to="{ name: 'Home' }">Pawsitive</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <span class="navbar-nav ml-auto p-1">
        <button class="nav-item btn btn-light text-center profileButton d-flex" v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'Profile' }">
          <router-link class="nav-link p-0" :to="{ path: '/profile/'+ profile.id }">Profile</router-link>
        </button>
      </span>
      <span class="navbar-text">
        <button class="btn btn-light" @click="login" v-if="!$auth.isAuthenticated">Dog In</button>
        <button class="btn btn-danger" @click="logout" v-else>Frog Out</button>
      </span>
    </div>
  </nav>
</template>

<script>
  import axios from "axios";
  import { getUserData } from "@bcwdev/auth0-vue";
  export default {
    name: "Navbar",
    methods: {
      async login() {
        await this.$auth.loginWithPopup();
        this.$store.dispatch("setBearer", this.$auth.bearer);
        console.log("this.$auth.user: ");
        console.log(this.$auth.user);
        this.$store.dispatch("getProfile");
      },
      async logout() {
        await this.$auth.logout();
        this.$store.dispatch("resetBearer");
        this.$router.push({ name: "home" });
      }
    },
    computed: {
      profile() {
        return this.$store.state.profile;
      },
    }
  };
</script>

<style>
  .name {
    font-family: "Pacifico";
    font-size: xx-large;
  }

  .profileButton {
    height: 7vh;
  }

  .logo {
    height: 7vh;
    width: 5vw;
  }
</style>