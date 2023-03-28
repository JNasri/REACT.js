// to use a snippet (re-usable code (generic))
// Ctrl + Alt + R
// then type rafce
import React from "react";

const Footer = ({ length }) => {
  return (
    <footer>
      <p>
        {length} {length === 1 ? "item" : "items"} selected
      </p>
    </footer>
  );
};

export default Footer;
