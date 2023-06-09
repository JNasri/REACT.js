// This DataContext allows us to pass values (props) down the drill
// of all react component using the useContext hook later
import { createContext, useState, useEffect } from "react";
// import the axios custom hook
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  // define a useState for search bar to be used with useEffect
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState([]);
  // define useState hooks
  const [search, setSearch] = useState("");
  // get the useAxiosFetch attributes
  const { data, fetchErr, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );
  // useEffect for data change
  useEffect(() => {
    setPosts(data);
  }, [data]);

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
  }, [posts, search]);

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        fetchErr,
        isLoading,
        posts,
        setPosts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
