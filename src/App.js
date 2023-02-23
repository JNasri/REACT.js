// React is all about components that are defined separately
// then added together into the root element
// this app.js is the currently the only component that is added to the index.js

// importing a component into the app component
import Header from "./Header";
// importing component into the app component
import Content from "./Content";
// importing component into the app component
import Footer from "./Footer";

// react is all about functions. Before, it was all about classes.
function App() {
  // the return is a JSX file (js and xml), its similar to HTML
  // any JS code must be written inside curly brackers {}
  return (
    <div className="App">
      {/* The code that was here was divided into
          different components and then imported
          into the app component (root component) */}
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
