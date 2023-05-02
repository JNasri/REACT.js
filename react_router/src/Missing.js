import React from "react";
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <main className="Missing">
      <h2>Page Not Found!</h2>
      <p>Well, that's disappointing.</p>
      <p>
        <Link to="/">Click here to go to Home</Link>
      </p>
    </main>
  );
};

export default Missing;
