const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
      },
    nom: {
        type: String,
        required: true,
      },
    listeIngredients: {
        type: String,
        required: true,
      },
    etapes: {
        type: String,
        required: true,
      },
    temps: {
        type: String,
        required: true,
      },
    image: {
      data: Buffer,
      contentType: String,
    },
  });

  const RecipeModel = mongoose.model('Recipe', RecipeSchema);
  