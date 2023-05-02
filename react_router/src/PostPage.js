import React from "react";
import { useParams, link } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const PostPage = ({ posts, handleDelete }) => {
  // get the parameter from the URL (must be same name)
  const { id } = useParams();
  // find the post that has the id of the id in parameter
  const post = posts.find((post) => post.id == id);
  return (
    <main className="PostPage">
      <article className="Post">
        {/* if we have a post, show it */}
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="PostDate">{post.datetime}</p>
            <p className="PostBody">{post.body}</p>
            <button onClick={() => handleDelete(post.id)}>Delete Post</button>
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
