// basically, react-router routes components so that pages don't need to reload
// each time a request is made.
// some components (Header, Navbar...) need to be present always
// but other components might need to change (text, layout....)
// and react-route can change these components with URL filepath of each one.

// importing the components that are static (don't change with each request)
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";

// importing the components to route to in the main area of the page
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing"; // 404 error page

// importing date library to use in dateTime attribute
import { format } from "date-fns";

// importing from react-route
import { Route, Switch, useHistory } from "react-router-dom";

// importing some react hooks
import { useState, useEffect } from "react";

// import the API we made with axios
import api from "./api/posts";
import useWindowSize from "./hooks/useWindowSize";
import useAxiosFetch from "./hooks/useAxiosFetch";
import EditPost from "./EditPost";

function App() {
  // hard-code 4 posts (later we will fetch from API)
  const [posts, setPosts] = useState([]);

  // define useState hooks
  const [search, setSearch] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  // create a hook for updating title and body of a post (with axios)
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  // useHistory is a hook in React Router that allows you to access the router state when navigating within your components
  const history = useHistory();
  // get the width
  const { width } = useWindowSize();
  // get the useAxiosFetch attributes
  const { data, fetchErr, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );
  // useEffect for data change
  useEffect(() => {
    setPosts(data);
  }, [data]);

  // define a useState for search bar to be used with useEffect
  const [searchResults, setSearchResults] = useState([]);
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

  const handleSubmit = async (e) => {
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

    // this code is after adding the axios api (data/db.json)
    try {
      // call api.post with path to db.json and the new post created
      const response = await api.post("/posts", newPost);
      // add newPost to all posts and setPosts the new list
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      // delete inputs in the form
      setPostTitle("");
      setPostBody("");
      // go back to home
      history.push("/");
    } catch (error) {
      console.log(`Error ${error.message}`);
    }
  };

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

  // a functoin for editing a post (Update operation of the CRUD operations)
  const handleEdit = async (id) => {
    // M=month , d=day , y=year , p = time
    const dateTime = format(new Date(), "MMMM dd, yyyy pp");
    // make an updatedPost object to updated a current post
    const updatedPost = {
      id,
      title: editTitle,
      datetime: dateTime,
      body: editBody,
    };
    // using axios we will update a post by its id and the data provided above
    try {
      // put(update) the post with the id wiht our updatedPost object
      const response = await api.put(`posts/${id}`, updatedPost);
      // using map to iterate through all posts
      // if a post is the deleted post (post.id == id), replace with response.data
      // else (the post is not the deleted post) , keep it as post
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      // empty the edit title and body inputs
      setEditTitle("");
      setEditBody("");
      // using the useHistory hook
      history.push("/");
    } catch (error) {
      console.log(`Error ${error.message}`);
    }
  };

  return (
    <div className="App">
      <Header title="ReactJS Blog" width={width} />
      <Nav search={search} setSearch={setSearch} />
      <Switch>
        <Route exact path="/">
          <Home
            posts={searchResults}
            fetchErr={fetchErr}
            isLoading={isLoading}
          />
        </Route>
        <Route exact path="/post">
          <NewPost
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
            handleSubmit={handleSubmit}
          />
        </Route>
        <Route exact path="/edit/:id">
          <EditPost
            posts={posts}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
            handleEdit={handleEdit}
          />
        </Route>
        <Route path="/post/:id">
          <PostPage posts={posts} handleDelete={handleDelete} />
        </Route>
        <Route path="/about" component={About}></Route>
        <Route path="*" component={Missing}></Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
