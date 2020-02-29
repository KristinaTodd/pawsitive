import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router";

Vue.use(Vuex);

let baseUrl = location.host.includes("localhost")
  ? "http://localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: baseUrl + "api",
  timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    profile: {},
    posts: [],
    activePost: {},
    comments: []
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
    setComments(state, comments) {
      state.comments = comments;
    },
    setActivePost(state, post) {
      state.activePost = post;
    },
    removePost(state, id) {
      state.posts = state.posts.filter(p => p.id != id)
    },
    removeComment(state, id) {
      state.comments = state.comments.filter(c => c.id != id)
    },
    editProfile(state, updatedProfile, id) {
      state.profile.picture = updatedProfile
    },
    editComment(state, updatedComment, id) {
      state.comments = state.comments.filter(p => p.id != id);
      state.comments.push(updatedComment)
    },
    editPost(state, updatedPost, id) {
      state.posts = state.posts.filter(p => p.id != id);
      state.posts.push(updatedPost)
    },
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async editProfile({ commit, dispatch }, update) {
      try {
        let res = await api.put("profile/" + update.profileId, update);
        commit("editProfile", res.data)
      } catch (error) { console.error(error); }
    },
    async getPosts({ commit, dispatch }) {
      try {
        let res = await api.get("posts");
        commit("setPosts", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getPostById({ commit, dispatch }, id) {
      try {
        let res = await api.get(id);
        commit("setActivePost", res.data);
      } catch (error) {
        console.error(error);
        router.push({ name: "Home" });
      }
    },
    async getPostsByProfileId({ commit, dispatch }, profileId) {
      try {

        let res = await api.get("profile/" + profileId + "/posts");
        commit("setPosts", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    setActivePost({ commit }, post) {
      commit("setActivePost", post)
    },
    async editPost({ commit, dispatch }, update, id) {
      try {
        let res = await api.put(update, id);
        let updatedPost = res.data
        commit("editPosts", updatedPost, id)
      } catch (error) { console.error(error); }
    },
    async deletePost({ commit, dispatch }, postId) {
      try {
        let res = await api.delete(postId);
        commit("removePost", postId);
        commit("setActivePost", {});
      } catch (error) {
        console.error(error);
        router.push({ name: "Home" });
      }
    },
    async addPost({ commit, dispatch }, newPost) {
      try {
        let res = await api.post("Posts", newPost);
        dispatch("getPosts");
      } catch (error) { console.error(error); }
    },
    async getCommentsByPostId({ commit, dispatch }, postId) {
      try {
        let res = await api.get(postId + "/comments");
        commit("setComments", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async addComment({ commit, dispatch }, comment) {
      try {
        let res = await api.post("Comments", comment);
        dispatch("getComments");
      } catch (error) { console.error(error); }
    },
    async deleteComment({ commit, dispatch }, commentId) {
      try {
        let res = await api.delete(commentId);
        commit("removeComment", commentId);
      } catch (error) {
        console.error(error);
      }
    },
    async editComment({ commit, dispatch }, update, id) {
      try {
        let res = await api.put(update, id);
        let updatedComment = res.data
        commit("editComments", updatedComment)
      } catch (error) { console.error(error); }
    }
  }
});
