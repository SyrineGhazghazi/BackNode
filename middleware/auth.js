const jwt = require('jsonwebtoken');
const config = require('../config/default.json'); // Pour gérer la configuration

module.exports = function(req, res, next) {
  // Récupérer le token depuis le header HTTP

  const token = req.header('Authorization').replace('Bearer ', '');
  console.log(req);

  // Vérifier s'il y a un token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied'});
  }

  // Vérifier le token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Ajouter l'utilisateur depuis le payload du token à l'objet de requête
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'error:'+err.message
    });
  }
};
