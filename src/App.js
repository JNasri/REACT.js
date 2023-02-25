// React is all about components that are defined separately
// then added together into the root element
// this app.js is the currently the only component that is added to the index.js

// importing a component into the app component
import Header from "./Header";
// importing component into the app component
import Content from "./Content";
// importing component into the app component
import Footer from "./Footer";
import { useState } from "react";
// importing fontAwesome trash icon

// react is all about functions. Before, it was all about classes.
function App() {
  // the return is a JSX file (js and xml), its similar to HTML
  // any JS code must be written inside curly brackers {}

  // we moved the items and their functions here so that we can drill it down
  // into 2 different components (content and footer)
  const [items, setItems] = useState([
    {
      id: 1,
      checked: false,
      item: "Book #8392 : The Diary Of Jane    ",
    },
    {
      id: 2,
      checked: false,
      item: "Book #981 : The Compound Effect    ",
    },
    {
      id: 3,
      checked: false,
      item: "Book #2937 : Atomic Habits    ",
    },
  ]);
  const handleCheck = (id) => {
    //console.log(`key : ${id}`);
    // we will use map() to create a new array that specifically changes the checked for the ID passed
    // if found (?) we retrun the item object with flipped checked (true -> false or vise versa)
    // if not found (:) we return the item object with no changes
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    // now after we updated the array, we will set the items using the useState hook
    setItems(listItems);
    // localstorage to save the changes even after reloading the page (not much important)
    localStorage.setItem("ShoppingList", JSON.stringify(listItems));
  };

  const handleDelete = (id) => {
    // console.log(`key : ${id}`);
    // filter() creates a new array without the item  that has the ID passed to the function
    const listItems = items.filter((item) => item.id !== id);
    // now after we deleted the item, we will set the new array using the useState hook
    setItems(listItems);
    // localstorage to save the changes even after reloading the page (not much important)
    localStorage.setItem("ShoppingList", JSON.stringify(listItems));
  };

  return (
    <div className="App">
      {/* The code that was here was divided into
          different components and then imported
          into the app component (root component) */}
      <Header title="BOOKS" />
      {/* we see the props drilling here as we pass the props to the child component */}
      <Content
        items={items}
        setItems={setItems}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length}/>
    </div>
  );
}

export default App;
