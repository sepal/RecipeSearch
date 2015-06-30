import mongoose from 'mongoose';

var ingredientSchema = mongoose.Schema({
  name: String,
  amount: Number,
});

var recipeSchema = mongoose.Schema({
  name: String,
  author: String,
  method: String,
  tags: [String],
  ingredients: [ingredientSchema]
});


var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
