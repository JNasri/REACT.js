import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

const Nav = () => {
  const posts = useStoreState((state) => state.posts);
  const search = useStoreState((state) => state.search);
  const setSearch = useStoreActions((actions) => actions.setSearch);
  const setSearchResults = useStoreActions(
    (actions) => actions.setSearchResults
  );
  // useEffect with [posts, search] as dependencies
  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        // check if any of the posts bodies match the search
        post.body.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        // or if any of the posts titles match the search
        post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    // after we found the resutl, set it (if empty it will show all posts)
    setSearchResults(filteredResults.reverse());
  }, [posts, search, setSearchResults]);

  return (
    <nav className="Nav">
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search Posts</label>
        <input
          type="text"
          id="search"
          placeholder="Search Post"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <ul>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/post">POST</Link>
        </li>
        <li>
          <Link to="/about">ABOUT</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
