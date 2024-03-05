const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require ('../models/userModel');
const controller = {
  newUser: async function(req, res) {
    try {
      const { username, password, rol, email } = req.body;

      const user = await User.findOne({ where: { username: username } });
      
      if(!user){

        const hashedPassword = await bcrypt.hash(password, 10);
        // Crear el usuario
        const newUser = await User.create({
          USERNAME: username,
          PASSWORD: hashedPassword,
          ROL: rol,
          email_name: email
        });

        // Enviar respuesta con el usuario creado
        return res.status(200).send({
        username: 'Usuario creado',
        user: newUser // Aquí se muestra el usuario creado
      });

      } else{
        return res.status(400).send({ error: 'Nombre de usuario ya existe' });
    }
      
    } catch (error) {
      // Manejo de errores
      console.error("Error al crear usuario:", error);
      return res.status(500).send({ error: 'Error al crear usuario' });
    }
  },
  
  
  
  

  listUsers: async function (req, res) {
    try {
      // Obtener todos los usuarios de la base de datos
      const users = await User.findAll({
        attributes: ['USERNAME', 'ROL'],
      });
     // Eliminar propiedades undefined del objeto
    const sanitizedUsers = users.map(user => {
      const sanitizedUser = {};
      Object.entries(user.toJSON()).forEach(([key, value]) => {
        if (value !== undefined) {
          sanitizedUser[key] = value;
        }
      });
      return sanitizedUser;
    });

    // Enviar la lista de usuarios (solo nombres y roles) como respuesta
    return res.status(200).send({ users: sanitizedUsers });
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    return res.status(500).send({ error: 'Error al listar usuarios' });
  }
},

    loginUser: async function(req, res) {

      try {
        const { username, password } = req.body;
    
        // Validar si el usuario existe en la base de datos
        const user = await User.findOne({ where: { username: username } });
        if (!user) {
          return res.status(400).send({ msg: 'No existe ese usuario en la base de datos' });
        }
    
        // Validar las passwords
        const passwordValid = await bcrypt.compare(password, user.PASSWORD);
        console.log(passwordValid, password, user.PASSWORD, password === user.PASSWORD);
        if (!passwordValid) { 
          return res.status(400).send({ msg: 'Contraseña incorrecta' });
        }
    
        // Generar el token si no existe o es inválido
        let token = user.TOKEN_USER;
        if (!token || !isTokenValid(token)) {
          token = jwt.sign({ username: user.ID_USER }, '123', { expiresIn: '1h' });
          user.TOKEN_USER = token;
          await user.save();
        }
    
        return res.status(200).send({ 
          ID_USER:user.ID_USER,
          USERNAME: user.USERNAME,
          TOKEN_USER: user.TOKEN_USER,
          ROL: user.ROL
        });
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return res.status(500).send({ error: 'Error al iniciar sesión' });
      }
      },
      
      updateUserPassword: async function(req, res) {
        console.log('updateUserPassword', req.params.id, req.body);	

        try {
          const userId = req.params.id; // Obtener el ID del usuario desde la URL
          const { password } = req.body;
        console.log('updateUserPassword', req.params.id, req.body);	

          // Encontrar el usuario por su ID
          const user = await User.findByPk(userId);
          if (!user) {
            return res.status(404).send({ msg: 'Usuario no encontrado' });
          }
    
          // Verificar si se proporcionó la nueva contraseña
          if (!password) {
            return res.status(400).send({ msg: 'Se requiere una nueva contraseña' });
          }
          console.log('constrase;a cambiada', password);
          // Actualizar la contraseña
          const hashedPassword = await bcrypt.hash(password, 10);
          user.PASSWORD = hashedPassword;
    
          // Guardar la nueva contraseña en la base de datos
          await user.save();
    
          // Enviar respuesta con confirmación de actualización
          return res.status(200).send({
            msg: 'Contraseña actualizada exitosamente para el usuario ID: ' + userId
          });
        } catch (error) {
          console.error("Error al actualizar la contraseña:", error);
          return res.status(500).send({ error: 'Error al actualizar la contraseña' });
        }
      },


      deleteUserById: async function (req, res) {
        try {
          const userId = req.params.id; // asumiendo que el ID está en los parámetros de la solicitud
      
          // Verificar si el usuario existe
          const userToDelete = await User.findByPk(userId);
      
          if (!userToDelete) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
          }
      
          // Eliminar al usuario
          await userToDelete.destroy();
      
          return res.status(200).send({ message: 'Usuario eliminado exitosamente' });
        } catch (error) {
          console.error("Error al eliminar usuario:", error);
          return res.status(500).send({ error: 'Error al eliminar usuario' });
        }
      }
      
    

}
function isTokenValid(token) {
  try {
    const decoded = jwt.verify(token, '123');
    return true;
  } catch (error) {
    return false;
  }
}
module.exports = controller;