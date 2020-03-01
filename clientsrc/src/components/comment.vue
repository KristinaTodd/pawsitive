<template>
  <div class="col-12">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8 card m-1">
        <div class="row">
          <div class="col-9 text-left justify-content-center name p-1">
            <h5>{{commentData.content}}</h5>
          </div>
          <div class="col-3 text-right text-secondary">By: {{commentData.creatorEmail}}</div>
          <!-- <div class="col-10"></div> -->
          <div class="col-12 justify-content-end p-1"><button class="btn btn-danger"
              v-if="commentData.creatorEmail == activeProfile.email" @click="deleteComment">Delete</button></div>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Comment",
    methods: {
      deleteComment() {
        debugger;
        this.$store.dispatch("deleteComment", this.commentData.id);
      }
    },
    computed: {
      activeProfile() {
        return this.$store.state.profile;
      }
    },
    props: ["commentData", "commentIndex"]
  };
</script>

<style scoped>
  .name {
    font-family: "Pacifico";
    font-size: xx-large;
  }
</style>