// to use a snippet (re-usable code)
// Ctrl + Alt + R
// then type rafce
import React from "react";

const Content = () => {
  const handleNames = () => {
    const names = ["Mike", "Rob", "Jon"];
    const int = Math.floor(Math.random() * 3);
    return names[int];
  };
  return (
    <main>
      <p>Hello {handleNames()}</p>
    </main>
  );
};

export default Content;
