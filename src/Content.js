// to use a snippet (re-usable code)
// Ctrl + Alt + R
// then type rafce
import React from "react";

// React hook : JS reusable code that helps alot

// importing useState hook
import { useState } from "react";

const Content = () => {
  // below is a code for the useState hook
  // name is the name to be shown and setName changes the name
  // Joe is default name when we render the page for the first time
  const [name, setName] = useState("Joe");

  // another useState hook example
  const [count, setCount] = useState(0);

  const handleNames = () => {
    const names = ["Mike", "Rob", "Jon"];
    const int = Math.floor(Math.random() * 3);
    // call the useState function to change the name
    setName(names[int]);
  };

  const handleClick = () => {
    console.log(count);
  };

  const handleClick2 = (name) => {
    console.log(`Hello, ${name}`);
  };

  const handleClick3 = (e) => {
    console.log(e);
  };
  return (
    <main>
      <p>Hello {name}</p>
      <button onClick={handleNames}>Change Name</button>
      <button onClick={() => setCount(count + 1)}>Count ++</button>
      <button onClick={handleClick}>Check Count</button>

      <button onClick={() => handleClick2("Dave")}>Click Me</button>
      <button onClick={(e) => handleClick3(e)}>Click Me</button>
    </main>
  );
};

export default Content;
