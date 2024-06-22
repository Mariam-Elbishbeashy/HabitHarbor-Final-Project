const express = require('express');
const userRoutes = express.Router();
const UserController = require('../controllers/User');
const Users=require('../models/userdb');
const multer = require('multer');

var methodOverride = require('method-override')
userRoutes.use(methodOverride('_method'))
userRoutes.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Ensure 'images' folder exists and is writable
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10 // 10 MB file size limit
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Only JPG, JPEG, or PNG files are allowed!'), false);
    }
    cb(null, true);
  }
});


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

userRoutes.put('/editUser/:id', upload.single('profile_image'), async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  try {
    if (req.file) {
      updateData.Image = req.file.filename; // Save the new image filename
    }

    const updatedUser = await Users.findOneAndUpdate(
      { _id: userId },
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send('User not found.');
    }

    req.session.user = updatedUser; // Update session with new user data
    res.redirect("/user"); // Redirect to user profile page after update
  } catch (err) {
    console.error('Error updating user:', err);

    if (err instanceof multer.MulterError) {
      return res.status(400).send('File upload error: ' + err.message);
    }

    res.status(500).send('Internal Server Error');
  }
});



module.exports = userRoutes;