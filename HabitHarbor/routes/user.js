const express = require('express');
const userRoutes = express.Router();
const UserController = require('../controllers/User');
const Users=require('../models/userdb');

var methodOverride = require('method-override')
userRoutes.use(methodOverride('_method'))

userRoutes.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    const user = new Users(req.body);
    await user.save();
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to save user");
  }
})
userRoutes.post('/home', async (req, res) => {
  try {
    const { Email, Password } = req.body; // Destructure Email and Password from req.body

    // Find the user in the database
    const user = await Users.findOne({ Email: Email });

    if (user) {
      if (user.Password === Password) {
        
        req.session.user = user; // Store user data in session
        console.log("created",user.id);
        if (user.DataType === "admin") {
          // Admin user logic
          res.redirect("/admin"); // Redirect to admin home page
        } else if (user.DataType === "user") {
          // Regular user logic
          res.redirect("/home"); // Redirect to regular user home page
        } else {
          // Handle unexpected DataType (optional)
          res.redirect("/home");
        }
      } else {
        res.json("The username or password is incorrect");
      }
    } else {
      res.status(404).json("User not found"); // Return 404 if user is not found
    }
  } catch (err) {
    console.error("Error finding user:", err);
    res.status(500).json("Internal Server Error");
  }
});
userRoutes.post('/logout', (req, res) => {
  req.session.destroy(err => {
    console.log("destroyed");
    if (err) {
      return res.redirect('./front');
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

userRoutes.put('/editUser/:id', async (req, res) => {
  const userId = req.params.id;
  try {
   // Example: Updating session user data after edit
const updatedUser = await Users.findOneAndUpdate(
  { _id: userId },
  { $set: req.body },
  { new: true }
);
// Update session data
req.session.user = updatedUser;

    res.redirect("/user"); // Redirect to appropriate page after update
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update user" + err.message);
  }
});
module.exports = userRoutes;
