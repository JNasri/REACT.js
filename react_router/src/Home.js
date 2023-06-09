import React from "react";
import Feed from "./Feed";
import { useContext } from "react";
import DataContext from "./context/DataContext";

const Home = () => {
  const { searchResults, fetchErr, isLoading } = useContext(DataContext);
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
