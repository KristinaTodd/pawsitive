<template>
  <li>{{commentData.content}}</li>
</template>

<script>
export default {
  name: "Comment",
  props: ["commentData", "commentIndex"]
};
</script>

<style scoped>
</style>