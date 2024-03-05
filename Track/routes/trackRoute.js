const express = require('express');
const Track = require('../controller/trackController');
const router = express.Router();
router.post('/createRoutes', Track.newRoute)
router.get('/viewRoutes', Track.getAllRoutes);
router.delete('/deleteRoute/:id', Track.deleteRoute);
router.put('/updateRoute/:id', Track.updateRoute);
module.exports = router;