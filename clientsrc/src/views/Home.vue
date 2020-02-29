<template>
  <div class="home">
    <div class="container">
      <div v-if="$auth.isAuthenticated" class="loggedIn row">
        <!-- Button trigger modal -->
        <button
          type="button"
          class="btn btn-secondary"
          data-toggle="modal"
          data-target="#new-post"
        >New Post</button>

        <!-- Modal -->
        <div
          class="modal fade"
          id="new-post"
          tabindex="-1"
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h3 class="modal-title">Create a Post</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form @submit.prevent="createPost">
                <div class="modal-body">
                  <div class="container-fluid">
                    <div class="row">
                      <h5>Photo:</h5>
                      <input
                        placeholder="Image URL..."
                        type="url"
                        name="image"
                        id="image"
                        v-model="newPost.imgUrl"
                      />
                    </div>
                    <div class="row">
                      <h5>Name:</h5>
                      <input
                        placeholder="Give your photo a name!"
                        type="text"
                        name="name"
                        id="name"
                        v-model="newPost.name"
                      />
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <post
        v-for="(postObj, index) in posts"
        :key="postObj.id"
        :postData="postObj"
        :postIndex="index"
      />
    </div>
  </div>
</template>

<script>
import Post from "@/components/posts";
export default {
  name: "createPost",
  mounted() {
    this.$store.dispatch("getPosts");
  },
  data() {
    return {
      newPost: {
        profileId: ""
      }
    };
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    posts() {
      return this.$store.state.posts;
    }
  },
  components: {
    Post
  },
  methods: {
    createPost() {
      this.newPost.profileId = this.profile.id;
      this.$store.dispatch("addPost", this.newPost);
    }
  }
};
</script>
