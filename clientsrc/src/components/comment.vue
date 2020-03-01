<template>
  <li>
    {{commentData.content}} - {{commentData.creatorEmail}}
    <button
      v-if="commentData.creatorEmail == activeProfile.email"
      @click="deleteComment"
    >Delete</button>
  </li>
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
</style>