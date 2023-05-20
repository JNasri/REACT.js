import React from "react";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EditPost = ({
  posts,
  handleEdit,
  editBody,
  setEditBody,
  editTitle,
  setEditTitle,
}) => {
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
