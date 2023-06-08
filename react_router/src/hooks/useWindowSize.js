// import usetState and useEffect hooks
import { useState, useEffect } from "react";

// function for the window Size
const useWindowSize = () => {
  // set useState hook of the window size
  const [windowSize, setWindowSize] = useState({
    // set the default values to be undefined
    width: undefined,
    height: undefined,
  });

  // set useEffect hook of the windoe size
  // dependecy [] is empyt, so this will run only at load time
  useEffect(() => {
    // function to handle window resize
    const handleResize = () => {
      // use the useState we wrote to set the window size
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // call the function we wrote above when the page is loaded first time
    handleResize();
    // event listener for when the page is resized, we call the same function
    window.addEventListener("resize", handleResize);

    // return with removing the EL for memory save
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // after we finish , return the window size
  return windowSize;
};


// export the function that has the hooks 
export default useWindowSize;
