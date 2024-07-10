const Room = require('../models/Room');

// Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new room
exports.createRoom = async (req, res) => {
  const { name, capacity, equipments, availability } = req.body;

  try {
    let room = new Room({ name, capacity, equipments, availability });
    await room.save();
    res.json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get a room by ID
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ msg: 'Salle non trouvée' });
    }
    res.json(room);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Salle non trouvée' });
    }
    res.status(500).send('Server Error');
  }
};

// Update a room
exports.updateRoom = async (req, res) => {
  const { name, capacity, equipments, availability } = req.body;

  try {
    let room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ msg: 'Salle non trouvée' });
    }

    room.name = name || room.name;
    room.capacity = capacity || room.capacity;
    room.equipments = equipments || room.equipments;
    room.availability = availability || room.availability;

    await room.save();
    res.json(room);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Salle non trouvée' });
    }
    res.status(500).send('Server Error');
  }
};

// Delete a room
exports.deleteRoom = async (req, res) => {
  try {
    let room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ msg: 'Salle non trouvée' });
    }

    await room.remove();
    res.json({ msg: 'Salle supprimée' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Salle non trouvée' });
    }
    res.status(500).send('Server Error');
  }
};
