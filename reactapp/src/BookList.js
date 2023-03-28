// to use a snippet (re-usable code)
// Ctrl + Alt + R
// then type rafce

// this is a child component that is related
// to the parent component (content.js)
import React from "react";
// importing the bookline component
import BookLine from "./BookLine";

// we will pass the props that are passed to contnet.js (the parent component of this component)
const BookList = ({ items, setItems, handleCheck, handleDelete }) => {
  return (
    // {/* unordered list to display books */}
    <ul>
      {/* map function to map the array of books  */}
      {items.map((item) => (
        <BookLine
          key={item.id}
          item={item}
          setItems={setItems}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

// now after we made the list in its own component
// we will import it in the parent (content.js)
export default BookList;
