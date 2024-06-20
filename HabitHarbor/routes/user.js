const express = require('express');
const userRoutes = express.Router();
const UserController = require('../controllers/User');

userRoutes.post('/login',UserController.saveusersignup);
userRoutes.post('/home',UserController.getuserlogin);
module.exports = userRoutes;
