import { useState, useEffect } from "react";
import { getRecipes, updateRecipe, getRecipesCategories, addCategory, updateCategory, deleteCategory } from "../services/api";
import styles from "../styles/RecipeOrganizer.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const RecipeOrganizer = () => {
  const [categories, setCategories] = useState({});
  const [draggedRecipe, setDraggedRecipe] = useState(null);
  const [fetchedOnce, setFetchedOnce] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [updatedCategoryName, setUpdatedCategoryName] = useState("");
  const [isDragging, setIsDragging] = useState(false);


  useEffect(() => {
    const fetchCategoriesAndRecipes = async () => {
      try {
        const categoriesData = await getRecipesCategories();
        const formattedCategories = categoriesData.reduce((acc, cat) => {
          acc[cat._id] = { name: cat.name, recipes: [] };
          return acc;
        }, {});

        const recipes = await getRecipes();
        recipes.forEach((recipe) => {
          const catId = categoriesData.find((c) => c.name === recipe.category)?._id || "unsorted";
          if (!formattedCategories[catId]) formattedCategories[catId] = { name: "Unsorted", recipes: [] };
          if (!formattedCategories[catId].recipes.some((r) => r._id === recipe._id)) {
            formattedCategories[catId].recipes.push(recipe);
          }
        });

        setCategories(formattedCategories);
        setFetchedOnce(true);
      } catch (error) {
        console.error("Error fetching categories or recipes:", error);
      }
    };

    if (!fetchedOnce) fetchCategoriesAndRecipes();
  }, [fetchedOnce]);

  const handleDragStart = (recipe) => {
    setDraggedRecipe(recipe);
    setIsDragging(true); // Enable dragging state
  };
  
  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = async (categoryId) => {
    if (!draggedRecipe) return;

    setCategories((prevCategories) => {
      const updatedCategories = { ...prevCategories };
      Object.keys(updatedCategories).forEach((id) => {
        updatedCategories[id].recipes = updatedCategories[id].recipes.filter((r) => r._id !== draggedRecipe._id);
      });

      updatedCategories[categoryId].recipes.push({ ...draggedRecipe, category: updatedCategories[categoryId].name });
      return updatedCategories;
    });

    await updateRecipe(draggedRecipe._id, { category: categories[categoryId].name });
    setDraggedRecipe(null);
    setIsDragging(false);
  };
  

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    console.log("closing modal")
    setIsModalOpen(false);
    setNewCategoryName("");
  };

  const handleAddCategory = async () => {
    if (!newCategoryName) return;

    const response = await addCategory({ name: newCategoryName });

    console.log("API Response:", response); // Debugging

    if (!response || !response.category || !response.category._id) {
      console.error("Invalid category response:", response);
      return;
    }

    const newCategory = response.category; // Extract the actual category

    setCategories((prevCategories) => ({
      ...prevCategories,
      [newCategory._id]: { name: newCategory.name, recipes: [] },
    }));

    closeModal();
  };


  const handleEdit = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setUpdatedCategoryName(categories[categoryId].name);
    setIsEditModalOpen(true);
  };

  const handleDelete = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setIsDeleteModalOpen(true);
  };

  const confirmEditCategory = async () => {
    if (!updatedCategoryName || updatedCategoryName === categories[selectedCategoryId].name) return;

    await updateCategory(selectedCategoryId, { name: updatedCategoryName });

    setCategories((prevCategories) => {
      const updatedCategories = { ...prevCategories };
      updatedCategories[selectedCategoryId].name = updatedCategoryName;
      return updatedCategories;
    });

    setIsEditModalOpen(false);
    setSelectedCategoryId(null);
  };

  const confirmDeleteCategory = async () => {
    await deleteCategory(selectedCategoryId);

    setCategories((prevCategories) => {
      const updatedCategories = { ...prevCategories };
      delete updatedCategories[selectedCategoryId];
      return updatedCategories;
    });

    setIsDeleteModalOpen(false);
    setSelectedCategoryId(null);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
        <button className={styles.addCategoryButton} onClick={openModal}>
          + Add Category
        </button>
      </div>

      <div className={styles.container}>
        {Object.keys(categories).map((categoryId) => (
          <div key={categoryId} className={styles.category} onDragOver={handleDragOver} onDrop={() => handleDrop(categoryId)}>
            <div className={styles.categoryHeader}>
              <h3>{categories[categoryId].name}</h3>
              <div className={styles.actionButtons}>
                <FaEdit className={styles.icon} onClick={() => handleEdit(categoryId)} />
                <FaTrash className={styles.icon} onClick={() => handleDelete(categoryId)} />
              </div>
            </div>
            {categories[categoryId].recipes.map((recipe) => (
              <>              
              <div
                key={recipe._id}
                className={`${styles.card} ${draggedRecipe?._id === recipe._id ? styles.dragging : ""}`}
                draggable
                onDragStart={() => handleDragStart(recipe)}
              >
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "20px" }}>
                  <img
                    src={recipe.image ? `http://localhost:5000${recipe.image}` : "https://via.placeholder.com/150"}
                    alt={recipe.title}
                    className={styles.recipeImage}
                  />
                  <h4>{recipe.title}</h4>
                </div>
              </div>
              </>
            ))}
          </div>
          
        ))}
      </div>

      {/* Add Category Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Add Category</h2>
            <input type="text" placeholder="Category Name" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className={styles.inputField} />
            <div className={styles.modalButtons}>
              <button className={styles.submitButton} onClick={handleAddCategory}>Submit</button>
              <button className={styles.cancelButton} onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit & Delete Modals */}
      {isEditModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Edit Category</h2>
            <input type="text" value={updatedCategoryName} onChange={(e) => setUpdatedCategoryName(e.target.value)} className={styles.inputField} />
            <div className={styles.modalButtons}>
              <button className={styles.submitButton} onClick={confirmEditCategory}>Update</button>
              <button className={styles.cancelButton} onClick={() => setIsEditModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Delete Category?</h2>
            <p>Are you sure you want to delete "{categories[selectedCategoryId]?.name}"?</p>
            <div className={styles.modalButtons}>
              <button className={styles.deleteButton} onClick={confirmDeleteCategory}>Delete</button>
              <button className={styles.cancelButton} onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeOrganizer;
