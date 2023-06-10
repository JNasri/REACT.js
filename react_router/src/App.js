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
import EditPost from "./EditPost";
import Missing from "./Missing"; // 404 error page
// importing useAxiosFetch and useEffect
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useEffect } from "react";
// importing from react-route
import { Route, Switch } from "react-router-dom";
// importing the usestore from easy-peasy
import { useStoreActions } from "easy-peasy";

function App() {
  // making the setPosts
  const setPosts = useStoreActions((actoins) => actoins.setPosts);
  // get the useAxiosFetch attributes
  const { data, fetchErr, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );
  // useEffect for data change
  useEffect(() => {
    setPosts(data);
  }, [data, setPosts]);
  return (
    <div className="App">
      <Header title="ReactJS Blog" />
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home isLoading={isLoading} fetchErr={fetchErr} />
        </Route>
        <Route exact path="/post">
          <NewPost />
        </Route>
        <Route exact path="/edit/:id">
          <EditPost />
        </Route>
        <Route path="/post/:id">
          <PostPage />
        </Route>
        <Route path="/about" component={About}></Route>
        <Route path="*" component={Missing}></Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
