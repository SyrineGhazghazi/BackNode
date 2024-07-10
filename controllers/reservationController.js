const Reservation = require('../models/Reservation');

// Get all reservations
exports.getAllReservation = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Créer une nouvelle réservation
exports.createReservation = async (req, res) => {
  const { roomId, userId, startTime, endTime } = req.body;

  try {
    let reservation = new Reservation({ roomId, userId, startTime, endTime });
    await reservation.save();
    res.json(reservation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
// Mettre à jour une réservation
exports.updateReservation = async (req, res) => {
  const { roomId, userId, startTime, endTime } = req.body;

  try {
    let reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ msg: 'Réservation non trouvée' });
    }

    reservation.roomId = roomId || reservation.roomId;
    reservation.userId = userId || reservation.userId;
    reservation.startTime = startTime || reservation.startTime;
    reservation.endTime = endTime || reservation.endTime;

    await reservation.save();
    res.json(reservation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};

// Supprimer une réservation
exports.deleteReservation = async (req, res) => {
  try {
    let reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ msg: 'Réservation non trouvée' });
    }

    await reservation.remove();
    res.json({ msg: 'Réservation supprimée' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};
