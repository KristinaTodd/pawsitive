<template>
  <div class="row">
    <div class="col-12 mx-auto text-center">
      <h1>{{details.name}}</h1>
    </div>
    <div class="col-12 mx-auto text-center">
      <img :src="details.imgUrl" />
    </div>
    <div class="col-12">
      <ul>
        <comment
          v-for="(commentObj, index) in comments"
          :key="commentObj.id"
          :commentData="commentObj"
          :commentIndex="index"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import Comment from "../components/comment";
export default {
  name: "PostDetails",
  mounted() {
    if (!this.$store.state.posts.length) {
      this.$store.dispatch("getPostById", this.$route.params.postId);
    } else {
      this.$store.dispatch(
        "setActivePost",
        this.$store.state.posts.find(p => p.id == this.$route.params.postId)
      );
    }
    this.$store.dispatch("getCommentsByPostId", this.$route.params.postId);
  },
  components: {
    Comment
  },
  computed: {
    comments() {
      let data = this.$store.state.comments;
      return data;
    },
    details() {
      return this.$store.state.activePost;
    }
  }
};
</script>

<style scoped>
img {
  max-width: 40rem;
}
</style>