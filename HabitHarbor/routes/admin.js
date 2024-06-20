const express = require('express');
const adminRoutes = express.Router();
const AdminController = require('../controllers/Admin');

//saving new activities to database
adminRoutes.post('/admin', AdminController.saveActivity);
//displaying activities
adminRoutes.get('/api/activities', AdminController.getActivities);
//deleting activities
adminRoutes.delete('/admin/deleteactivities/:id', AdminController.deleteActivity);
//editing activities
adminRoutes.put('/admin/editactivity/:id', AdminController.editActivity);
//saving new users to database
adminRoutes.post('/admin/adduser', AdminController.saveUser);
//displaying users
adminRoutes.get('/api/users', AdminController.getUsers);
//displaying admins
adminRoutes.get('/api/admins', AdminController.getUsers);
//deleting users
adminRoutes.delete('/admin/deleteusers/:id', AdminController.deleteUser);
//editing users
adminRoutes.put('/admin/editusers/:id', AdminController.editUser);
//saving new resources to database
adminRoutes.post('/admin/saverecource', AdminController.saveRecource);
//displaying resources
adminRoutes.get('/api/resources', AdminController.getResources);
//deleting resources
adminRoutes.delete('/admin/deleteresources/:id', AdminController.deleteResource);
//editing resources
adminRoutes.put('/admin/editresource/:id', AdminController.editResource);

module.exports = adminRoutes;