import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaPlus, FaFolderOpen, FaUserCircle } from "react-icons/fa";
import "../styles/global.css";

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // Initialize from storage
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(!!localStorage.getItem("token"));
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setDropdownOpen(false);
        navigate("/auth", { replace: true });
    };

    return (
        <nav>
            {/* Left Side - Logo and Name */}
            <Link to="/recipeList">
            <div className="nav-left">
                <img
                    src="https://png.pngtree.com/png-clipart/20240618/original/pngtree-restaurant-logo-vector-png-image_15358604.png"
                    alt="Logo"
                    className="logo"
                />
                <h1 className="site-name">Recipe Hub</h1>
            </div>
            </Link>
            {/* Center - Navigation Links */}
            <div className="nav-links">
                <Link to="/recipeList">
                    <FaHome /> Home
                </Link>
                <Link to="/add">
                    <FaPlus /> Add Recipe
                </Link>
                <Link to="/organizer">
                    <FaFolderOpen /> Organizer
                </Link>
            </div>

            {/* Right Side - Account Icon with Dropdown */}
            <div className="nav-right">
                <div>
                    <div className="account-icon" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <FaUserCircle size={40} />
                    </div>
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            {isLoggedIn ? <button className="logout-btn" onClick={handleLogout}>
                                Logout
                            </button> : <Link to="/auth" className="auth-link">Login / Register</Link>
                            }
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
