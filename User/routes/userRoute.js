const express = require('express');
const User = require('../controller/userController');
const router = express.Router();
router.post('/createUser', User.newUser);
router.post('/login', User.loginUser);
router.put('/update/:id',User.updateUserPassword);
router.get('/viewUsers', User.listUsers);
router.delete('/deleteUser/:id', User.deleteUserById);
module.exports = router;