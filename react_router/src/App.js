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

// importing from react-route
import { Route, Switch, useHistory } from "react-router-dom";

// importing some react hooks
import { useState, useEffect } from "react";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/post">
          <NewPost />
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
