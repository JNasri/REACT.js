// to use a snippet (re-usable code)
// Ctrl + Alt + R
// then type rafce
import React from "react";
// importing the booklist
import BookList from "./BookList";

// this is a child component that is related
// to the parent component (app.js)

// here we are passing the react properties that were
// defined in the partent component (app.js), we can see that
// they have the same name so no need to change anything
const Content = ({ items, setItems, handleCheck, handleDelete }) => {
  return (
    <main>
      {/* check if the length is > 0 , if not present a message written down */}
      {items.length ? (
        <BookList
          items={items}
          setItems={setItems}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p styel={{ marginTop: "2rem" }}>List is Empty</p>
      )}
    </main>
  );
};

export default Content;
