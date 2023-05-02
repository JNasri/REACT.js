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

function App() {
  // hard-code 4 posts (later we will fetch from API)
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
  ]);

  // define useState hooks
  const [search, setSearch] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  // useHistory is a hook in React Router that allows you to access the router state when navigating within your components
  const history = useHistory();

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
    // add newPost to all posts and setPosts the new list
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    // delete inputs in the form
    setPostTitle("");
    setPostBody("");
    // go back to home
    history.push("/");
  };

  const handleDelete = (id) => {
    // remove the post from the list
    const postsList = posts.filter((post) => post.id != id);
    // set the posts to the list with the new list
    setPosts(postsList);
    // once delete is finished, go to home page with
    // using the useHistory hook
    history.push("/");
  };

  return (
    <div className="App">
      <Header title="ReactJS Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Switch>
        <Route exact path="/">
          <Home posts={searchResults} />
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
