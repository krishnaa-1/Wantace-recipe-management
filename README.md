# Recipe Management System

## Overview
The Recipe Management System is a web-based application that allows users to create, manage, and explore various recipes. It provides an intuitive interface for adding ingredients, instructions, and categories, making it easy to organize and share recipes.

## Features
- User authentication & authorization
- Create, read, update, and delete (CRUD) recipes
- Categorization of recipes
- Drag and Drop for Categorixation(User-friendly)
- Image upload for recipes
- User-friendly dashboard for recipe management

## Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB
- Git

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/krishnaa-1/Wantace-recipe-management.git
   ```
2. Navigate to the project directory:
   ```sh
   cd recipe-management
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     PORT=4000
     ```
5. Start the server:
   ```sh
   npm start
   ```
6. Access the application at `http://localhost:4000`

## API Documentation

### Authentication
#### User Registration
**Endpoint:** `POST /api/auth/register`
**Request Body:**
```json
{
  "username": "user123",
  "email": "user@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "613b1f3e2f3e2a001c3e2b4a",
    "username": "user123",
    "email": "user@example.com"
  }
}
```

#### User Login
**Endpoint:** `POST /api/auth/login`
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "613b1f3e2f3e2a001c3e2b4a",
    "username": "user123"
  }
}
```

### Recipe Endpoints
#### Create a Recipe
**Endpoint:** `POST /api/recipes`
**Headers:**
```json
{
  "Authorization": "Bearer jwt_token_here"
}
```
**Request Body:**
```json
{
  "title": "Spaghetti Carbonara",
  "ingredients": [
    "200g spaghetti",
    "100g pancetta",
    "2 eggs",
    "50g parmesan cheese",
    "Salt and pepper"
  ],
  "instructions": "Boil spaghetti. Fry pancetta. Mix eggs and cheese. Combine all together.",
  "category": "Italian"
}
```
**Response:**
```json
{
  "message": "Recipe created successfully",
  "recipe": {
    "id": "613b1f3e2f3e2a001c3e2b4b",
    "title": "Spaghetti Carbonara"
  }
}
```

#### Get All Recipes
**Endpoint:** `GET /api/recipes`
**Response:**
```json
[
  {
    "id": "613b1f3e2f3e2a001c3e2b4b",
    "title": "Spaghetti Carbonara",
    "category": "Italian"
  }
]
```

#### Get Recipe by ID
**Endpoint:** `GET /api/recipes/:id`
**Response:**
```json
{
  "id": "613b1f3e2f3e2a001c3e2b4b",
  "title": "Spaghetti Carbonara",
  "ingredients": [
    "200g spaghetti",
    "100g pancetta",
    "2 eggs",
    "50g parmesan cheese",
    "Salt and pepper"
  ],
  "instructions": "Boil spaghetti. Fry pancetta. Mix eggs and cheese. Combine all together.",
  "category": "Italian"
}
```

#### Update a Recipe
**Endpoint:** `PUT /api/recipes/:id`
**Headers:**
```json
{
  "Authorization": "Bearer jwt_token_here"
}
```
**Request Body:**
```json
{
  "title": "Updated Recipe Title"
}
```
**Response:**
```json
{
  "message": "Recipe updated successfully"
}
```

#### Delete a Recipe
**Endpoint:** `DELETE /api/recipes/:id`
**Headers:**
```json
{
  "Authorization": "Bearer jwt_token_here"
}
```
**Response:**
```json
{
  "message": "Recipe deleted successfully"
}
```

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT

## Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Make your changes and commit: `git commit -m "Add new feature"`
4. Push to the branch: `git push origin feature-branch`
5. Submit a pull request.

## License
This project is licensed under the MIT License.

