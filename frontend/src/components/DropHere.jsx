import React from "react";
import styles from "../styles/RecipeOrganizer.module.css";

const DropHere = ({ isDragging }) => {
  return (
    <div
      className={styles.card}
      style={{
        margin: "10px",
        opacity: isDragging ? "1" : "0.5",
        display: isDragging ? "block" : "none", // Hide when not dragging
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <h4>Drop Here</h4>
    </div>
  );
};

export default DropHere;
