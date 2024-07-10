const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middleware/auth');

// GET all rooms
router.get('/', roomController.getAllRooms);

// POST create a new room
router.post('/createRoom', roomController.createRoom);
 router.put('/updateRoom', authMiddleware, roomController.updateRoom);
 router.delete('/deleteRoom', authMiddleware, roomController.deleteRoom);
 router.get('/', authMiddleware,roomController.getAllRooms);
  router.get('/updateRoom/:id',authMiddleware, roomController.getRoomById);
module.exports = router;
