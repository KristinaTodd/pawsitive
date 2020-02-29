<template>
  <li>
    {{commentData.content}} - {{commentData.creatorEmail}}
    <button @click="deleteComment">Delete</button>
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
  props: ["commentData", "commentIndex"]
};
</script>

<style scoped>
</style>