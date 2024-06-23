const express = require('express');
const indexRoutes = express.Router();
const UserController = require('../controllers/User');
const Resource = require('../models/resourcedb');


indexRoutes.post('/posts/saveposts', UserController.savePost);
indexRoutes.post('/posts/:id/comment', UserController.commentPost);
indexRoutes.get('/posts', UserController.getPosts);
indexRoutes.get('/resources', UserController.getResources);
indexRoutes.get('/home', UserController.selectActivity);
indexRoutes.post('/home/:id/custom', UserController.AddcustomActivity);
indexRoutes.post('/home/:id/weeklycustom', UserController.AddcustomWeeklyActivity);
indexRoutes.post('/home/:id/monthlycustom', UserController.AddcustomMonthlyActivity);
indexRoutes.put('/home/addprogress/:id', UserController.Addprogress);
indexRoutes.put('/home/addprogressM/:id', UserController.AddprogressM);

// add activity to user's array of activities
//indexRoutes.post('/home/addactivitytouser', UserController.addActivityToUser);
// update the user custom activity array when an activity is checked (Done:true)
//indexRoutes.put('/home/checkcustomactivity', UserController.checkCustomActivity);
module.exports = indexRoutes;
