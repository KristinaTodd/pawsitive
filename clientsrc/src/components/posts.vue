<template>
  <router-link :to="{name: 'PostDetails', params: {postId: this.postData.id}}">
    <div @click="setActive" class="card m-auto" style="width: 18rem;">
      <img :src="postData.imgUrl" class="card-img-top" />
      <div class="card-body text-center">
        <h5 class="name text-info">{{postData.name}}</h5>
        <p class="text-secondary"> {{postData.creatorEmail}}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
  export default {
    name: "Post",
    props: ["postData", "postIndex"],
    methods: {
      setActive() {
        this.$store.dispatch("setActivePost", this.postData);
      }
    }
  };
</script>

<style scoped>
  .name {
    font-family: "Pacifico";
    font-size: xx-large;
  }
</style>