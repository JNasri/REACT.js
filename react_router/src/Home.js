import React from "react";
import Feed from "./Feed";
import { useStoreState } from "easy-peasy";

const Home = ({ isLoading, fetchErr }) => {
  const searchResults = useStoreState((state) => state.searchResults);

  return (
    <main className="Home">
      {isLoading && <p className="statusMsg">Loading posts....</p>}
      {!isLoading && fetchErr && (
        <p className="statusMsg" style={{ color: "red" }}>
          {fetchErr}
        </p>
      )}
      {!isLoading &&
        !fetchErr &&
        (searchResults.length ? (
          <Feed posts={searchResults} />
        ) : (
          <p className="statusMsg">No Posts to Display.</p>
        ))}
    </main>
  );
};

export default Home;
