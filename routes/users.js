const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// POST créer un nouvel utilisateur
router.post('/createUser', userController.createUser);

// GET obtenir tous les utilisateurs
router.get('/allUsers', userController.getAllUsers);

// GET obtenir un utilisateur par ID
router.get('/:id', userController.getUserById);

// PUT mettre à jour un utilisateur
router.put('/updateUser/:id', userController.updateUser);

// DELETE supprimer un utilisateur
router.delete('/deleteUser/:id', userController.deleteUser);

// Route pour obtenir le profil de l'utilisateur authentifié
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;
