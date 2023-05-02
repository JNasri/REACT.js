import React from "react";

const NewPost = (
  { postTitle , setPostTitle,
    postBody , setPostBody,
    handleSubmit
  }
) => {
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
            <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
