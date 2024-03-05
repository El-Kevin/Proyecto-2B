const jwt = require('jsonwebtoken');

const Token = {
  validateToken: function(req, res, next) {
    console.log('Validating token...');
    const headerToken = req.headers['authorization'];

    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
      try {
        const bearerToken = headerToken.slice(7);
        console.log('bearer', bearerToken)
        // Clave secreta para verificar el token
        jwt.verify(bearerToken, "123");

        // El token es válido, pasar al siguiente middleware
        next();
      } catch (error) {
        // Manejo de diferentes errores JWT
        if (error.name === 'JsonWebTokenError') {
          res.status(401).send({
            error: 'Token inválido',
          });
        } else if (error.name === 'TokenExpiredError') {
          res.status(401).send({
            error: 'Token expirado',
          });
        } else {
          res.status(401).send({
            error: 'Error en la autenticación del token',
          });
        }
      }
    } else {
      res.status(401).send({
        error: 'Acceso denegado, token no proporcionado o en formato incorrecto',
      });
    }
  },
};

module.exports = Token;
