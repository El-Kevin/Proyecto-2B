const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete CORS
const http = require('http');
const router = express.Router();
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const axios = require('axios');
const Token = require('./validate-token');

const connectedUser = new Set();
io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado', socket.id);
  io.emit('connected-user', connectedUser.size);
  connectedUser.add(socket.id);

  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado', socket.id);
    connectedUser.delete(socket.id);
    io.emit('connected-user', connectedUser.size);
  });

  socket.on('message', (data)=> {
    console.log(data);
    socket.broadcast.emit('message-receive', data);
  });

  
});




//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar cabeceras y cors


  app.use(cors({
    origin: '*', // Permitir acceso desde cualquier origen

    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'X-API-KEY', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Access-Control-Allow-Request-Method'],
  }));





  // Ruta para la gestión de usuarios
router.post('/users/createUser', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:3600/users/createUser', req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ error: error.message }); // Devolver el mensaje de error real
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:3600/users/login', req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

router.put('/users/update/:id',Token.validateToken, async (req, res) => {
  try {
    const response = await axios.put(`http://localhost:3600/users/update/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

router.get('/viewUsers',Token.validateToken, async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3600/users/viewUsers');
    res.json(response.data);
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

router.delete('/users/deleteUser/:id',Token.validateToken, async (req, res) => {
  try {
    const response = await axios.delete(`http://localhost:3600/users/deleteUser/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});


// Ver todas las rutas
router.get('/viewRoutes',Token.validateToken, async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3500/routes/viewRoutes');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

// Borrar una ruta por ID
router.delete('/deleteRoute/:id',Token.validateToken, async (req, res) => {
  try {
    const response = await axios.delete(`http://localhost:3500/routes/deleteRoute/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

// Actualizar una ruta por ID
router.put('/updateRoute/:id',Token.validateToken, async (req, res) => {
  try {
    const response = await axios.put(`http://localhost:3500/routes/updateRoute/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});


router.post('/createRoutes',Token.validateToken, async (req, res) => {
  try {
    const response = await axios.post('http://localhost:3500/routes/createRoutes', req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ error: error.message }); // Devolver el mensaje de error real
  }
});

app.use('/', router)
//Exportar
  module.exports = {app, server};