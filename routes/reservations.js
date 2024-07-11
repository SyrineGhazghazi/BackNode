const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middleware/auth');

// POST créer une nouvelle réservation (protégé par JWT)
router.post('/createResa',  reservationController.createReservation);
router.post('/updateResa', authMiddleware, reservationController.updateReservation);
router.get('/',reservationController.getAllReservation);
router.delete('/deleteResa', authMiddleware, reservationController.deleteReservation);

module.exports = router;
