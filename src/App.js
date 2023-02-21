// React is all about components that are defined separately 
// then added together into the root element
// this app.js is the currently the only component that is added to the index.js

// importing the logo and the css
import logo from "./logo.svg";
import "./App.css";

// react is all about functions. Before, it was all about classes.
function App() {
  const handleNames = () => {
    const names = ["Mike","Rob","Jon"];
    const int = Math.floor(Math.random() * 3);
    return names[int];
  }
  // the return is a JSX file (js and xml), its similar to HTML
  // any JS code must be written inside curly brackers {}
  return (
    <div className="App">
      <header className="App-header">
        {/* comments in JSX are considered javascript code, this is why its inside curly brackets. we see below that logo is javascript and the function we wrote above is also javascript and they are all in curly brackets */}
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello {handleNames()} !</p>
      </header>
    </div>
  );
}

export default App;
