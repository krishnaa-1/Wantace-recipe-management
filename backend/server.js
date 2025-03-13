const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/config.db");
const recipeRoutes = require("./routes/recipeRoutes");
const logger = require("./middleware/logger");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();

// Enable CORS for all origins
app.use(cors({
    origin: "https://wantace-recipe-management-m1gz.vercel.app", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,  // If using cookies or authentication headers
}));

app.use(express.json());
app.use(logger);
app.use("/api/recipes", recipeRoutes);
app.use("/api/auth", authRoutes);

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
