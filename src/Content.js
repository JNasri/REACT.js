// to use a snippet (re-usable code)
// Ctrl + Alt + R
// then type rafce
import React from "react";

// React hook : JS reusable code that helps alot

// importing useState hook
import { useState } from "react";
// importing fontAwesome trash icon
import { FaTrashAlt } from "react-icons/fa";

const Content = () => {
  // below is a code for the useState hook
  // name is the name to be shown and setName changes the name

  // useState(/*here is the default array of books*/)
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
    <main>
      {/* check if the length is > 0 , if not present a message written down */}
      {items.length ? (
        // {/* unordered list to display books */}
        <ul>
          {/* map function to map the array of books  */}
          {items.map((item) => (
            // we see below that a list element needs a key so that react can keep track of each item. the key can be the id (unique)
            <li className="item" key={item.id}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheck(item.id)}
              />
              <label
                onDoubleClick={() => handleCheck(item.id)}
                style={item.checked ? { textDecoration: "line-through" } : null}
              >
                {item.item}
              </label>
              {/* here we added a react icon instead of a button */}
              <FaTrashAlt
                role="button"
                tabIndex="0"
                cursor="pointer"
                onClick={() => handleDelete(item.id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p styel={{ marginTop: "2rem" }}>List is Empty</p>
      )}
    </main>
  );
};

export default Content;
