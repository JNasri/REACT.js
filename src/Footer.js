// to use a snippet (re-usable code (generic))
// Ctrl + Alt + R
// then type rafce
import React from "react";

const Footer = () => {
  const today = new Date();

  return (
    <footer>
      <p>Copyright &copy; {today.getFullYear()}</p>
    </footer>
  );
};

export default Footer;
