import React from "react";
import "../styles/RecipeCard.css";
import { Link } from "react-router-dom";

const truncateText = (text, wordLimit) => {
  if (!text) return ""; // Ensure function does nothing if text is undefined/null
  const words = text.split(" ");
  return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
};

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card-container">
      <img
        src={recipe.image ? `http://localhost:5000${recipe.image}` : "https://via.placeholder.com/150"}
        alt={recipe.title}
      />
      <h3>{recipe.title}</h3>
      <h4 className="recipe-category">{recipe.category}</h4>
      
      <div className="recipe-details">
        <span>⏳ {recipe.time || "40"} min</span>
        <span>🍽 {recipe.serving || "4-6"} servings</span>
      </div>

      {recipe.description && ( // Only render the description if it exists
        <p><strong>Description:</strong> {truncateText(recipe.description, 20)}</p>
      )}
      
      <Link to={`/recipe/${recipe._id}`} className="view-recipe">View Recipe</Link>
    </div>
  );
};

export default RecipeCard;
