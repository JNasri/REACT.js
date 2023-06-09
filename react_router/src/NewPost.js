import React from "react";
import { useState, useContext } from "react";
import DataContext from "./context/DataContext";
import { useHistory } from "react-router-dom";
import api from "./api/posts";
import { format } from "date-fns";

const NewPost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const { posts, setPosts } = useContext(DataContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if posts exists, get last id and add 1 to it, else just 1
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    // M=month , d=day , y=year , p = time
    const dateTime = format(new Date(), "MMMM dd, yyyy pp");
    // make a newPost object to add into the list
    const newPost = {
      id,
      title: postTitle,
      datetime: dateTime,
      body: postBody,
    };

    // this code is after adding the axios api (data/db.json)
    try {
      // call api.post with path to db.json and the new post created
      const response = await api.post("/posts", newPost);
      // add newPost to all posts and setPosts the new list
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      // delete inputs in the form
      setPostTitle("");
      setPostBody("");
      // go back to home
      history.push("/");
    } catch (error) {
      console.log(`Error ${error.message}`);
    }
  };
  return (
    <main className="NewPost">
      <h2>Make a NewPost!</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        ></input>
        <label htmlFor="postBody">The Post</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        ></textarea>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </main>
  );
};

export default NewPost;
