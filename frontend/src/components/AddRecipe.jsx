import { useState, useEffect } from "react";
import { addRecipe, getRecipesCategories } from "../services/api";
import styles from "../styles/AddRecipe.module.css";

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    time: "",
    serving: "",
    ingredients: "",
    instructions: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getRecipesCategories();
        setCategories(data); // Store API response in state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const validate = () => {
    let newErrors = {};
    if (recipe.title.trim().length < 3) newErrors.title = "Title must be at least 3 characters.";
    if (recipe.description.trim().length < 10) newErrors.description = "Description must be at least 10 characters.";
    if (!recipe.time || isNaN(recipe.time) || recipe.time <= 0) newErrors.time = "Time must be a positive number.";
    if (!recipe.serving || isNaN(recipe.serving) || recipe.serving <= 0) newErrors.serving = "Serving must be a positive number.";
    if (recipe.ingredients.trim().length < 5) newErrors.ingredients = "Ingredients must be at least 5 characters.";
    if (recipe.instructions.trim().length < 10) newErrors.instructions = "Instructions must be at least 10 characters.";
    if (!categories.some(cat => cat.name === recipe.category)) {
      newErrors.category = "Please select a valid category.";
    }
    if (!image) newErrors.image = "Please upload an image.";
    return newErrors;
  };

  const handleChange = (e) => setRecipe({ ...recipe, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append("title", recipe.title);
    formData.append("description", recipe.description);
    formData.append("time", recipe.time);
    formData.append("serving", recipe.serving);
    formData.append("ingredients", recipe.ingredients);
    formData.append("instructions", recipe.instructions);
    formData.append("category", recipe.category);
    formData.append("image", image);

    await addRecipe(formData);
    alert("Recipe added!");
    setRecipe({ title: "", description: "", time: "", serving: "", ingredients: "", instructions: "", category: "" });
    setImage(null);
    setImagePreview(null);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container} encType="multipart/form-data">
      <input name="title" placeholder="Title" value={recipe.title} onChange={handleChange} required />
      {errors.title && <p className={styles.error}>{errors.title}</p>}

      <textarea name="description" placeholder="Description" value={recipe.description} onChange={handleChange} required />
      {errors.description && <p className={styles.error}>{errors.description}</p>}

      <input type="number" name="time" placeholder="Time (minutes)" value={recipe.time} onChange={handleChange} required />
      {errors.time && <p className={styles.error}>{errors.time}</p>}

      <input type="number" name="serving" placeholder="Servings" value={recipe.serving} onChange={handleChange} required />
      {errors.serving && <p className={styles.error}>{errors.serving}</p>}

      <input name="ingredients" placeholder="Ingredients (comma-separated)" value={recipe.ingredients} onChange={handleChange} required />
      {errors.ingredients && <p className={styles.error}>{errors.ingredients}</p>}

      <textarea name="instructions" placeholder="Instructions" value={recipe.instructions} onChange={handleChange} required />
      {errors.instructions && <p className={styles.error}>{errors.instructions}</p>}

      <select name="category" value={recipe.category} onChange={handleChange} required>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      {errors.category && <p className={styles.error}>{errors.category}</p>}

      <input type="file" accept="image/*" onChange={handleImageChange} />
      {errors.image && <p className={styles.error}>{errors.image}</p>}

      {imagePreview && <img src={imagePreview} alt="Selected" className={styles.imagePreview} />}

      <button
        style={{
          width: '105%',
          padding: '12px',
          background: '#ff6600',
          color: '#fff',
          border: 'none',
          fontSize: '18px',
          fontWeight: 'bold',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: '0.3s ease',
          fontFamily: "'Jost', sans-serif"
        }}
      >
        Add Recipe
      </button>

    </form>
  );
};

export default AddRecipe;
