// React is all about components that are defined separately
// then added together into the root element
// this app.js is the currently the only component that is added to the index.js

// importing a component into the app component
import Header from "./Header";
// importing a component into the app component
import AddBook from "./AddBook";
// importing a component into the app component
import SearchBook from "./SearchBook";
// importing component into the app component
import Content from "./Content";
// importing component into the app component
import Footer from "./Footer";
import { useState, useEffect } from "react";
// importing fontAwesome trash icon

// react is all about functions. Before, it was all about classes.
function App() {
  // the return is a JSX file (js and xml), its similar to HTML
  // any JS code must be written inside curly brackers {}

  // we moved the items and their functions here so that we can drill it down
  // into 2 different components (content and footer)
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("ShoppingList") || [])
  );

  // here we create a state for the addBook
  // useState('') empty because no predefined data to be present
  const [newItem, setNewItem] = useState("");

  // here we create a state for searching a book
  // useState('') empty because no predefined data to be present
  const [search, setSearch] = useState("");

  // useEffect is a react hook that runs with every render
  // or dependeing on change in dependencies (e.g [items])
  useEffect(() => {
    localStorage.setItem("ShoppingList", JSON.stringify(items));
  }, [items]);

  // here we define the add item function
  const addItme = (item) => {
    // if items have length then take last id and ++, else start form 1
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    // myNewItem is the id, check always flase, and the item
    const myNewItem = { id, checked: false, item };
    // add myNewItem to the items array
    const listItems = [...items, myNewItem];
    // set items in the listItems
    setItems(listItems);
  };

  const handleCheck = (id) => {
    //console.log(`key : ${id}`);
    // we will use map() to create a new array that specifically changes the checked for the ID passed
    // if found (?) we retrun the item object with flipped checked (true -> false or vise versa)
    // if not found (:) we return the item object with no changes
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    // set items in the listItems
    setItems(listItems);
  };

  const handleDelete = (id) => {
    // console.log(`key : ${id}`);
    // filter() creates a new array without the item  that has the ID passed to the function
    const listItems = items.filter((item) => item.id !== id);
    // set items in the listItems
    setItems(listItems);
  };

  const handleSubmit = (e) => {
    // event.preventDefault prevents the page from reloading
    e.preventDefault();
    // if no new item presented in the input just return
    if (!newItem) return;
    // if we have an item, we add it then clear the input
    addItme(newItem);
    // clearing the input
    setNewItem("");
  };

  return (
    <div className="App">
      {/* The code that was here was divided into
          different components and then imported
          into the app component (root component) */}
      <Header title="BOOKS" />
      {/* we added the addbook form here after the header */}
      <AddBook
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      {/* we added the search form here after the add form  */}
      <SearchBook search={search} setSearch={setSearch} />

      {/* we see the props drilling here as we pass the props to the child component */}
      <Content
        items={items.filter((item) =>
          item.item.toLowerCase().includes(search.toLowerCase())
        )}
        setItems={setItems}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
