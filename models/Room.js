const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  equipments: {
    type: [String],
    default: []
  },
  availability: {
    type: [Date],
    default: []
  }
});

module.exports = mongoose.model('Room', RoomSchema);
