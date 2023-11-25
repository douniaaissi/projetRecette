const express = require('express');
const login = require('../controllers/LoginController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserSchema');
const router = express.Router();


router.post('/login', async (req, res) => {                                                                                                                                                                                                                                         
    try {
      const { email, password }= req.body;
      console.log(email, password);
      const user = await UserModel.findOne({ email });
      console.log(user);
      if (!user) {
        return res.status(401).json({ message: 'Nom ou mot de passe incorrect.' });
      }
  
      // Vérifiez le mot de passe
      const passwordMatch= await bcrypt.compare(password, user.password);
      console.log(passwordMatch);
      if (!passwordMatch) {
        return res.status(402).json({ message: 'Nom ou mot de passe incorrect.' });
      }
  
      res.status(200).json({ message: 'ok' });
    } catch (error) {
      res.status(500).json({ message: 'Une erreur est survenue lors de la connexion.' });
    }});

module.exports = router;
