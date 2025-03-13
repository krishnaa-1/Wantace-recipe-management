import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import RecipeList from "./components/RecipeList";
import AddRecipe from "./components/AddRecipe";
import RecipeOrganizer from "./components/RecipeOrganizer";
import RecipeDetails from "./components/RecipeDetails";
import AuthForm from "./components/AuthForm";
import NotFound from "./components/NotFound";
import "./styles/global.css";

// Function to check if the user is authenticated
const isAuthenticated = () => !!localStorage.getItem("token");

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/auth" />;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Redirect root route to /auth */}
        <Route path="/" element={<Navigate to="/auth" />} />
        
        {/* Public Routes */}
        <Route path="/auth" element={<AuthForm />} />
        
        {/* Protected Routes */}
        <Route path="/recipeList" element={<ProtectedRoute element={<RecipeList />} />} />
        <Route path="/recipe/:id" element={<ProtectedRoute element={<RecipeDetails />} />} />
        <Route path="/add" element={<ProtectedRoute element={<AddRecipe />} />} />
        <Route path="/organizer" element={<ProtectedRoute element={<RecipeOrganizer />} />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
