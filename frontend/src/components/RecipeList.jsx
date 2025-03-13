import { useState, useEffect } from "react";
import { getRecipes } from "../services/api";
import RecipeCard from "./RecipeCard";
import "../styles/RecipeList.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [index, setIndex] = useState(0); // Track index for slider
  const [randomRecipe, setRandomRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getRecipes().then(setRecipes);
  }, []);

  const totalRecipes = recipes.length;
  const visibleRecipes = 4; // Show 4 recipes at a time

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % totalRecipes);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + totalRecipes) % totalRecipes);
  };

  const handleSurpriseMe = () => {
    if (recipes.length > 0) {
      const randomIndex = Math.floor(Math.random() * recipes.length);
      setRandomRecipe(recipes[randomIndex]);
      navigate(`/recipe/${recipes[randomIndex]._id}`); // Redirect to RecipeDetails
    }
  };

  return (
    <div className="recipe-list">
      {/* Header Section */}
      <div className="header-container">
        <h2>Recipes List</h2>
        <button className="surprise-btn" onClick={handleSurpriseMe}>
          Surprise Me!
        </button>
      </div>

      <div className="slider-container">
        <button className="arrow left-arrow" onClick={prevSlide}>
          <FaArrowLeft />
        </button>

        <div className="recipes-slider">
          {recipes
            .slice(index, index + visibleRecipes)
            .concat(recipes.slice(0, Math.max(0, index + visibleRecipes - totalRecipes)))
            .map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
        </div>

        <button className="arrow right-arrow" onClick={nextSlide}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default RecipeList;
