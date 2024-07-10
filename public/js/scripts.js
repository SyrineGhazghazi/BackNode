document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour récupérer les salles de réunion (exemple)
    fetchRooms();
  
    // Exemple pour créer un utilisateur
    createUser('john_doe', 'john@example.com', 'password123');
  
    // Exemple pour créer une réservation
    createReservation('roomId123', 'userId456', '2024-06-15T09:00:00', '2024-06-15T10:00:00');
  
    // Exemple pour récupérer les réservations protégées par JWT
    fetchReservations();
  });
  
  // Fonction pour récupérer les salles de réunion
  async function fetchRooms() {
    try {
      const token = localStorage.getItem('token'); // Récupérer le token JWT stocké localement
  
      const response = await fetch('/api/rooms', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token // Inclure le token JWT dans l'en-tête
        }
      });
  
      const data = await response.json();
      console.log('Rooms:', data);
    } catch (err) {
      console.error('Error:', err);
    }
  }
  
  // Fonction pour créer un utilisateur
  async function createUser(username, email, password) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });
  
      const data = await response.json();
      console.log('User created:', data);
    } catch (err) {
      console.error('Error:', err);
    }
  }
  
  // Fonction pour créer une réservation
  async function createReservation(roomId, userId, startTime, endTime) {
    try {
      const token = localStorage.getItem('token'); // Récupérer le token JWT stocké localement
  
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token // Inclure le token JWT dans l'en-tête
        },
        body: JSON.stringify({ roomId, userId, startTime, endTime })
      });
  
      const data = await response.json();
      console.log('Reservation created:', data);
    } catch (err) {
      console.error('Error:', err);
    }
  }
  
  // Fonction pour récupérer les réservations protégées par JWT
  async function fetchReservations() {
    try {
      const token = localStorage.getItem('token'); // Récupérer le token JWT stocké localement
  
      const response = await fetch('/api/reservations', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token // Inclure le token JWT dans l'en-tête
        }
      });
  
      const data = await response.json();
      console.log('Reservations:', data);
    } catch (err) {
      console.error('Error:', err);
    }
  }
  