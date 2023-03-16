import React from "react";

import { FaPlus } from "react-icons/fa";
import { useRef } from "react";

const AddBook = ({ newItem, setNewItem, handleSubmit }) => {
  const inputRef = useRef();
  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="addBook">Add Book</label>
      <input
        autoFocus
        ref={inputRef}
        id="addBook"
        type="text"
        placeholder="Add Book"
        required
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button
        type="submit"
        aria-label="Add Book"
        onClick={() => inputRef.current.focus()}
      >
        <FaPlus />
      </button>
    </form>
  );
};

export default AddBook;
