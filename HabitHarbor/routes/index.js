const express = require('express');
const indexRoutes = express.Router();
const UserController = require('../controllers/User');
const Resource = require('../models/resourcedb');


indexRoutes.post('/posts/saveposts', UserController.savePost);
indexRoutes.post('/posts/:id/comment', UserController.commentPost);
indexRoutes.get('/posts', UserController.getPosts);
indexRoutes.get('/resources', UserController.getResources);
indexRoutes.post('/home/:id/custom', UserController.customActivity);

module.exports = indexRoutes;
