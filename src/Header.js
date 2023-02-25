// to use a snippet (re-usable code)
// Ctrl + Alt + R 
// then type rafce
import React from "react";

const Header = (props) => {
  return (
    <header>
      {/* after passing props in the parameter we can
          pass the title that was written in the header
          element in the app.js file */}
      <h1>{props.title}</h1>
    </header>
  );
};

// when you're desinging the component, it is best
// to give default values to the component so that if
// no value was present it will show the default not an error.
Header.defaultProps = {
  // the below will appear in the <h1> if the titel was not provided in the app.js file
  title: "Default Title"
}

export default Header;
