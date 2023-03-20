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
import { FaParagraph } from "react-icons/fa";
// importing fontAwesome trash icon

// react is all about functions. Before, it was all about classes.
function App() {
  // we will add the API here so that we can do CRUD operations on data instead of using localstorage
  const API_URL = "http://localhost:3500/items";

  // we moved the items and their functions here so that we can drill it down
  // into 2 different components (content and footer)
  const [items, setItems] = useState([]);

  // here we create a state for the addBook
  // useState('') empty because no predefined data to be present
  const [newItem, setNewItem] = useState("");

  // here we create a state for searching a book
  // useState('') empty because no predefined data to be present
  const [search, setSearch] = useState("");

  // useState for catching fetch errors
  const [fetchErr, setFetchErr] = useState(null);

  // useState to see if the page is still fetching data from API
  // either true(fetching) or false(notFetching)
  const [isLoading, setIsLoading] = useState(true);
  // useEffect is a react hook that runs with every render
  // or dependeing on change in dependencies (e.g [items])
  useEffect(() => {
    // make an async functoin that fetch items from API
    const fetchItems = async () => {
      try {
        // get data from API
        const response = await fetch(API_URL);
        // check if response is bad (not 200)
        if (!response.ok) {
          throw Error("Did not recieve expected data!");
        }
        // make it JSON object
        const listItems = await response.json();
        // set it (using the useState hook)
        setItems(listItems);
        setFetchErr(null);
      } catch (error) {
        setFetchErr(error.message);
        // here , we set the state of loading data from the API
        // so basically it is set to false if the data is being loaded, then to true if it has finished
      } finally {
        setIsLoading(false);
      }
    };
    // simulate the time taken to load from API
    setTimeout(() => {
      // call the function above
      fetchItems();
    }, 1000);
  }, []);

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

  // the return is a JSX file (js and xml), its similar to HTML
  // any JS code must be written inside curly brackers {}
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

      <main>
        {/* if the data is being loaded, show this message*/}
        {isLoading && <p>Loading Items...</p>}
        {/* if error occur, show this message*/}
        {fetchErr && (
          <p
            style={{ color: "red", padding: "1rem" }}
          >{`Error :  ${fetchErr}`}</p>
        )}
        {/* we see the props drilling here as we pass the props to the child component */}
        {/* if no fetchErr and data isn't loading, show content */}
        {!fetchErr && !isLoading && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            setItems={setItems}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
