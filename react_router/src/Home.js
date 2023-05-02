import React from "react";
import Feed from "./Feed";

const Home = ({ posts }) => {
  return (
    <main className="Home">
      {/* posts exists? show feed, else show err message */}
      {posts.length ? (
        <Feed posts={posts} />
      ) : (
        <p style={{ marginTop: "2rem" }}>No Posts To Dispaly Here.</p>
      )}
    </main>
  );
};

export default Home;
