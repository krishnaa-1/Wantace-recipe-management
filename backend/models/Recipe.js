const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },
  description : {type : String},
  time:{type : Number},
  serving:{type : Number},
  ingredients: { type: [String], required: true },
  instructions: { type: [String], required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Recipe", RecipeSchema);
