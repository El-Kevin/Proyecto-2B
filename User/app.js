const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete CORS
const http = require('http');

const app = express();



//rutas

const userRoutes = require('./routes/userRoute');

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar cabeceras y cors


  app.use(cors({
    origin: '*', // Permitir acceso desde cualquier origen
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'X-API-KEY', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Access-Control-Allow-Request-Method'],
  }));

  app.use('/users', userRoutes);

//Exportar
  module.exports = app;