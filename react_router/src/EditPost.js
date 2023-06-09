import React from "react";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "./api/posts";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";

const EditPost = () => {
  // create a hook for updating title and body of a post (with axios)
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const { posts, setPosts } = useContext(DataContext);
  const history = useHistory();
  // a functoin for editing a post (Update operation of the CRUD operations)
  const handleEdit = async (id) => {
    // M=month , d=day , y=year , p = time
    const dateTime = format(new Date(), "MMMM dd, yyyy pp");
    // make an updatedPost object to updated a current post
    const updatedPost = {
      id,
      title: editTitle,
      datetime: dateTime,
      body: editBody,
    };
    // using axios we will update a post by its id and the data provided above
    try {
      // put(update) the post with the id wiht our updatedPost object
      const response = await api.put(`posts/${id}`, updatedPost);
      // using map to iterate through all posts
      // if a post is the deleted post (post.id == id), replace with response.data
      // else (the post is not the deleted post) , keep it as post
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      // empty the edit title and body inputs
      setEditTitle("");
      setEditBody("");
      // using the useHistory hook
      history.push("/");
    } catch (error) {
      console.log(`Error ${error.message}`);
    }
  };
  // get the ID from the parameters
  const { id } = useParams();
  // find the post to be updated
  const post = posts.find((post) => post.id == id);

  // when this component is called we need to get the data and set the state
  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [posts, setEditTitle, setEditBody]);
  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Post Title</label>
            <input
              id="postTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            ></input>
            <label htmlFor="postBody">The Post</label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            ></textarea>
            <button
              type="submit"
              onClick={() => {
                handleEdit(post.id);
              }}
            >
              Submit Edit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post Not Found!</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link to="/">Click here to go to Home</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
