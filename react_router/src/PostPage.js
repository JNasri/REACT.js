import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";
import api from "./api/posts";
import { useContext } from "react";
import DataContext from "./context/DataContext";

const PostPage = () => {
  const { posts, setPosts } = useContext(DataContext);
  const history = useHistory();

  // this code was edited after adding the axios api (data/db.json)
  const handleDelete = async (id) => {
    try {
      await api.delete(`posts/${id}`);
      // remove the post from the list
      const postsList = posts.filter((post) => post.id != id);
      // set the posts to the list with the new list
      setPosts(postsList);
      // once delete is finished, go to home page with
      // using the useHistory hook
      history.push("/");
    } catch (error) {
      console.log(`Error ${error.message}`);
    }
  };

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
