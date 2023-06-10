import React from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";

const PostPage = () => {
  const history = useHistory();
  // get the parameter from the URL (must be same name)
  const { id } = useParams();
  const deletePost = useStoreActions((actions) => actions.deletePost);
  const getPostById = useStoreState((state) => state.getPostById);
  // find the post that has the id of the id in parameter
  const post = getPostById(id);

  // this code was edited after adding the axios api (data/db.json)
  const handleDelete = (id) => {
    // delete the post with the ID
    deletePost(id);
    // once delete is finished, go to home page with
    // using the useHistory hook
    history.push("/");
  };

  return (
    <main className="PostPage">
      <article className="Post">
        {/* if we have a post, show it */}
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="PostDate">{post.datetime}</p>
            <p className="PostBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit Post</button>
            </Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
          </>
        )}
        {/* if no post found, show error page */}
        {!post && (
          <>
            <h2>Post Not Found!</h2>
            <p>Well, that's disappointing</p>
            <h3>
              <Link to="/">Click here to go to Home</Link>
            </h3>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
