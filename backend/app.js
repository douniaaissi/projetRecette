const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRouter');
const recipeRoutes = require('./routes/RecipeRouter');

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3001',
}));




// Routes
app.use('/auth', authRoutes);
app.use('/recipe', recipeRoutes);

//la base de données MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/aiProjet")
  .then(() => {
    console.log('Connecté à MongoDB');
  })
  .catch((error) => {
    console.error('Erreur de connexion à MongoDB', error);
  });

app.listen(3000, () => {
  console.log(`Serveur en cours d'exécution sur le port 3000`);
});
