<template>
  <div class="row container-fluid">
    <div class="col-12 mx-auto text-center name">
      <h1>{{details.name}}</h1>
    </div>
    <div class="col-12 mx-auto text-center">
      <img :src="details.imgUrl" />
    </div>
    <div class="col-12 mx-auto text-center">
      <span>{{details.creatorEmail}}</span>
    </div>
    <div class="col-12 mx-auto text-center">
      <div class="col-12 justify-content-end p-1"><button class="btn btn-danger"
          v-if="details.creatorEmail == activeProfile.email" @click="deletePost">Delete</button></div>
    </div>

    <div class="col-12">

      <comment v-for="(commentObj, index) in comments" :key="commentObj.id" :commentData="commentObj"
        :commentIndex="index" />

    </div>
    <div class="col-3"></div>
    <div class="col-6 card text-center p-1 m-1">
      <form action @submit.prevent="addComment">
        <input class="m-1" type="text" placeholder="Enter Comment..." name="comment" id="comment"
          v-model="newComment.content" />
        <button type="submit" class="btn btn-sm btn-info mb-1">Post!</button>
      </form>
    </div>
    <div class="col-3"></div>
  </div>
</template>

<script>
  import Comment from "../components/comment";
  export default {
    name: "PostDetails",

    data() {
      return {
        newComment: {}
      };
    },
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
    props: ["postData", "postIndex"],
    computed: {
      comments() {
        let data = this.$store.state.comments;
        return data;
      },
      details() {
        return this.$store.state.activePost;
      },
      activeProfile() {
        return this.$store.state.profile;
      }
    },
    methods: {
      deletePost() {
        this.$store.dispatch("deletePost", this.details.id);
      },
      addComment() {
        let data = {
          postId: this.$route.params.postId,
          profileId: this.details.profileId,
          content: this.newComment.content
        };
        this.$store.dispatch("addComment", data);
      }
    }
  };
</script>

<style scoped>
  img {
    max-width: 40rem;
  }

  .name {
    font-family: "Pacifico";
    font-size: xx-large;
  }
</style>