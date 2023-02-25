// to use a snippet (re-usable code)
// Ctrl + Alt + R
// then type rafce

// this is a child component that is related
// to the parent component (BookList.js)
//

import React from "react";
// importing fontAwesome trash icon
import { FaTrashAlt } from "react-icons/fa";


// we will pass the props that are passed to BookList.js (the parent component of this component) , but notice that we use item not items here.
const BookLine = ({ item, setItems, handleCheck, handleDelete }) => {
  return (
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
        onClick={() => handleDelete(item.id)}
        aria-label={`Delete ${item.item}`}
      />
    </li>
  );
};

export default BookLine;
