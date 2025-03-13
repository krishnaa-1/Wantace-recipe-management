import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById, updateRecipe } from "../services/api";
import { FiEdit } from "react-icons/fi";
import "../styles/RecipeDetails.css"; // Import external CSS file

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getRecipeById(id).then(setRecipe).catch(console.error);
  }, [id]);

  const handleUpdate = async (updatedData) => {
    await updateRecipe(id, updatedData);
    setIsModalOpen(false);
    getRecipeById(id).then(setRecipe).catch(console.error);
  };

  if (!recipe) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="recipe-container">
      <div className="recipe-card">
        {/* Left Section - Image & Title */}
        <div className="left-section">
          <img
            src={recipe.image ? `http://localhost:5000${recipe.image}` : "https://via.placeholder.com/150"}
            alt={recipe.title}
            className="recipe-image"
          />
          <h1 className="recipe-title">{recipe.title}</h1>
        </div>

        {/* Right Section - Details */}
        <div className="right-section">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}> 
          <h2 className="recipe-title">{recipe.title}</h2>
          <button className="edit-button" onClick={() => setIsModalOpen(true)}>
            <FiEdit /> Edit
          </button>
          </div>
          
          <p className="recipe-description">{recipe.description}</p>

          <div className="recipe-info">
            <span>⏳ Cooking Time:</span> {recipe.time} mins
          </div>
          <div className="recipe-info">
            <span>🍽 Servings:</span> {recipe.serving}
          </div>

          <h2 className="section-title">Ingredients</h2>
          <ul className="ingredient-list">
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h2 className="section-title">Instructions</h2>
          <ol type="1" className="instructions-list">
            {recipe.instructions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && <EditRecipeModal recipe={recipe} onClose={() => setIsModalOpen(false)} onUpdate={handleUpdate} />}
    </div>
  );
};

// Edit Modal Component
const EditRecipeModal = ({ recipe, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: recipe.title,
    description: recipe.description,
    time: recipe.time,
    serving: recipe.serving,
    ingredients: recipe.ingredients.join(", "),
    instructions: recipe.instructions.join("\n"),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRecipe = {
      ...formData,
      ingredients: formData.ingredients.split(",").map((item) => item.trim()),
      instructions: formData.instructions.split("\n").map((item) => item.trim()),
    };
    onUpdate(updatedRecipe);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Recipe</h2>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />

          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />

          <label>Cooking Time (mins):</label>
          <input type="number" name="time" value={formData.time} onChange={handleChange} required />

          <label>Servings:</label>
          <input type="number" name="serving" value={formData.serving} onChange={handleChange} required />

          <label>Ingredients (comma-separated):</label>
          <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} required />

          <label>Instructions (line-separated):</label>
          <textarea name="instructions" value={formData.instructions} onChange={handleChange} required />

          <div className="modal-buttons">
            <button type="submit" className="save-button">Save</button>
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeDetails;
