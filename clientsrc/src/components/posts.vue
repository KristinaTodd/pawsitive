<template>
  <div class="col-12 col-md-4 mt-3">
    <div class="card m-auto" style="width: 18rem;">
      <img :src="postData.imgUrl" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">{{postData.name}}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: ["postData", "postIndex"],
  methods: {}
};
</script>

<style scoped>
</style>