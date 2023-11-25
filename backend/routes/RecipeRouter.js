// routes/recetteRoutes.js

const express = require('express');
const multer = require('multer');
const RecipeModel = require('../models/RecipeSchema');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


//Ajouter une recette
router.post('/addRecipe', upload.single('image'), async (req, res) => {
  try {
    const { email , nom, listeIngredients, etapes, temps } = req.body;
    
    const nvRec = new RecipeModel({
      id,
      email,
      nom,
      listeIngredients,
      etapes,
      temps,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    await nvRec.save();

    res.json({ success: true, message: 'Recette ajoutée avec succès' });
  } catch (error) {
    console.error('Erreur', error);
    res.status(500).json({ success: false, message: 'Erreur' });
  }
});

//les détails d une recette
router.get('/:id', async (req, res) => {
    try {
      const recipe = await RecipeModel.findById(req.params.id);
      res.json(recipe);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur.' });
    }
});

//modifier une recette
router.put('/:id', async (req, res) => {
    try {
      const updatedRecipe = await RecipeModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      res.json(updatedRecipe);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur'});
    }
  });

//la liste des recettes
router.get('/listRecipe', async (req, res) => {
    try {
      const recipes = await RecipeModel.find();
      res.json(recipes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des recettes.' });
    }
  });

module.exports = router;