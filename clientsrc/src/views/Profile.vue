<template>
  <div class="about text-center">
    <div class="row">
      <div class="col-12">
        <h1><span class="name">Welcome,</span> {{ profile.name }}</h1>
      </div>
      <div class="col-12"><img class="rounded" :src="profile.picture" alt="" /></div>
      <div class="col-12">
        <p>{{ profile.email }}</p>
      </div>

      <div class="col-12">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
          data-whatever="@mdo">Change Picture</button>

        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Change Picture</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="editProfile">
                  <div class="form-group">
                    <label for="imgURL" class="col-form-label">New Picture:</label>
                    <input type="text" class="form-control" id="imgURL" v-model="update.picture">
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Update</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <hr>
      </div>

      <div class="col-12 name">
        <h3>Your Posts</h3>
      </div>
    </div>
    <div class="row justify-content-center">
      <post v-for="(postObj, index) in posts" :key="postObj.id" :postData="postObj" :postIndex="index" />
    </div>
  </div>
</template>

<script>
  import Post from "@/components/posts"

  export default {
    name: "Profile",
    mounted() {
      this.$store.dispatch("getPostsByProfileId", this.$route.params.id)
    },
    data() {
      return {
        update: {

        }
      }
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
      editProfile() {
        let data = {
          profileId: this.profile.id,
          picture: this.update.picture
        }
        this.$store.dispatch("editProfile", data)
      }
    }
  };
</script>

<style scoped>
  img {
    max-width: 200px;
  }

  .name {
    font-family: "Pacifico";
  }
</style>