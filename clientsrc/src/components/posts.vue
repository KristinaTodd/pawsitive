<template>
  <div class="col-12 col-md-4 mt-3">
    <router-link :to="{name: 'PostDetails', params: {postId: this.postData.id}}">
      <div @click="setActive" class="card m-auto" style="width: 18rem;">
        <img :src="postData.imgUrl" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">{{postData.name}}</h5>
        </div>
      </div>
    </router-link>
  </div>
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
</style>