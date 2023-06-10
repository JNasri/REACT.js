import React from "react";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import { useStoreState, useStoreActions } from "easy-peasy";

const NewPost = () => {
  const posts = useStoreState((state) => state.posts);
  const postTitle = useStoreState((state) => state.postTitle);
  const postBody = useStoreState((state) => state.postBody);
  const savePost = useStoreActions((actions) => actions.savePost);
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
  const setPostBody = useStoreActions((actions) => actions.setPostBody);
  const history = useHistory();

  const handleSubmit = (e) => {
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
    // save the post
    savePost(newPost);
    // go back to home
    history.push("/");
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
