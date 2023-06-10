import React from "react";

import { useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { format } from "date-fns";
import { useStoreState, useStoreActions } from "easy-peasy";

const EditPost = () => {
  const editTitle = useStoreState((state) => state.editTitle);
  const editBody = useStoreState((state) => state.editBody);
  const editPost = useStoreActions((actions) => actions.editPost);
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
  const setEditBody = useStoreActions((actions) => actions.setEditBody);

  const history = useHistory();
  const { id } = useParams();

  const getPostById = useStoreState((state) => state.getPostById);
  // find the post that has the id of the id in parameter
  const post = getPostById(id);

  // a functoin for editing a post (Update operation of the CRUD operations)
  const handleEdit = (id) => {
    // M=month , d=day , y=year , p = time
    const dateTime = format(new Date(), "MMMM dd, yyyy pp");
    // make an updatedPost object to updated a current post
    const updatedPost = {
      id,
      title: editTitle,
      datetime: dateTime,
      body: editBody,
    };
    editPost(updatedPost);
    // using the useHistory hook to move to the post page after update is complete
    history.push(`/post/${id}`);
  };

  // when this component is called we need to get the data and set the state
  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);
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
