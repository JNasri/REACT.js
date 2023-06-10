import { createStore, action, thunk, computed } from "easy-peasy";
import api from "./api/posts";

export default createStore({
  posts: [],
  setPosts: action((state, payload) => {
    state.posts = payload;
  }),
  postTitle: "",
  setPostTitle: action((state, payload) => {
    state.postTitle = payload;
  }),
  postBody: "",
  setPostBody: action((state, payload) => {
    state.postBody = payload;
  }),
  editTitle: "",
  setEditTitle: action((state, payload) => {
    state.editTitle = payload;
  }),
  editBody: "",
  setEditBody: action((state, payload) => {
    state.editBody = payload;
  }),
  search: "",
  setSearch: action((state, payload) => {
    state.search = payload;
  }),
  searchResults: [],
  setSearchResults: action((state, payload) => {
    state.searchResults = payload;
  }),
  postCount: computed((state) => state.posts.length),
  getPostById: computed((state) => {
    return (id) => state.posts.find((post) => post.id.toString() === id);
  }),

  savePost: thunk(async (actions, newPost, helpers) => {
    const { posts } = helpers.getState();
    // this code is after adding the axios api (data/db.json)
    try {
      // call api.post with path to db.json and the new post created
      const response = await api.post("/posts", newPost);
      // add newPost to all posts and setPosts the new list
      actions.setPosts([...posts, response.data]);
      // delete inputs in the form
      actions.setPostTitle("");
      actions.setPostBody("");
    } catch (error) {
      console.log(`Error ${error.message}`);
    }
  }),

  deletePost: thunk(async (actions, id, helpers) => {
    const { posts } = helpers.getState();
    try {
      await api.delete(`posts/${id}`);
      // set the posts to the list with the new list
      // and remove the post from the list
      actions.setPosts(posts.filter((post) => post.id != id));
    } catch (error) {
      console.log(`Error ${error.message}`);
    }
  }),

  editPost: thunk(async (actions, updatedPost, helpers) => {
    const { posts } = helpers.getState();
    const { id } = updatedPost;
    try {
      // put(update) the post with the id wiht our updatedPost object
      const response = await api.put(`posts/${id}`, updatedPost);
      // using map to iterate through all posts
      // if a post is the deleted post (post.id == id), replace with response.data
      // else (the post is not the deleted post) , keep it as post
      actions.setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      // empty the edit title and body inputs
      actions.setEditTitle("");
      actions.setEditBody("");
    } catch (error) {
      console.log(`Error ${error.message}`);
    }
  }),
});
