import axios from "axios";

const API_URL = `${import.meta.env.VITE_REACT_APP_API_URL}/api`


// Fetch all recipes
export const getRecipes = async () => (await axios.get(`${API_URL}/recipes`)).data;
export const getRecipesCategories = async () => (await axios.get(`${API_URL}/recipes/categories`)).data;
export const getRecipeById = async (id) => (await axios.get(`${API_URL}/recipes/${id}`)).data;

export const addCategory = async (categoryData) => {
  try {
    return (await axios.post(`${API_URL}/recipes/categories`, categoryData)).data;
  } catch (error) {
    console.error("Error adding category:", error);
  }
};

// Update a category
export const updateCategory = async (id, categoryData) => {
  try {
    return (await axios.put(`${API_URL}/recipes/categories/${id}`, categoryData)).data;
  } catch (error) {
    console.error("Error updating category:", error);
  }
};

// Delete a category
export const deleteCategory = async (id) => {
  try {
    await axios.delete(`${API_URL}/recipes/categories/${id}`);
  } catch (error) {
    console.error("Error deleting category:", error);
  }
};

// Add a new recipe with image upload
export const addRecipe = async (recipeData) => {
  try {
    await axios.post(`${API_URL}/recipes`, recipeData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    console.error("Error adding recipe:", error);
  }
};

// Update a recipe (supports text and image updates)
export const updateRecipe = async (id, data) => {
  try {
    const headers = data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {};
    return (await axios.put(`${API_URL}/recipes/${id}`, data, { headers })).data;
  } catch (error) {
    console.error("Error updating recipe:", error);
  }
};

// Register User
export const registerUser = async (userData) => {
  try {
    return (await axios.post(`${API_URL}/auth/register`, userData)).data;
  } catch (error) {
    console.error("Error registering user:", error.response?.data || error.message);
  }
};

// Login User
export const loginUser = async (credentials) => {
  try {
    return (await axios.post(`${API_URL}/auth/login`, credentials)).data;
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
  }
};
