import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p id="oops">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/recipeList">Go Back Home</Link>
    </div>
  );
};

export default NotFound;
