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
    cb(null, 'uploads'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10 
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
    const { Email, Password } = req.body; 

    const user = await Users.findOne({ Email: Email });

    if (user) {
      if (user.Password === Password) {
        
        req.session.user = user; 
        console.log("created",user.id);
        if (user.DataType === "admin") {
         
          res.redirect("/admin"); 
        } else if (user.DataType === "user") {
          
          res.redirect("/home"); 
        } else {
          
          res.redirect("/home");
        }
      } else {
        res.json("The username or password is incorrect");
      }
    } else {
      res.status(404).json("User not found"); 
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
      updateData.Image = req.file.filename; 
    }

    const updatedUser = await Users.findOneAndUpdate(
      { _id: userId },
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send('User not found.');
    }

    req.session.user = updatedUser; 
    res.redirect("/user"); 
  } catch (err) {
    console.error('Error updating user:', err);

    if (err instanceof multer.MulterError) {
      return res.status(400).send('File upload error: ' + err.message);
    }

    res.status(500).send('Internal Server Error');
  }
});

userRoutes.get('/user', async (req, res) => {
  try {
    const users = await Users.find();
    res.render('user', { arr: users });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving data');
  }
});

userRoutes.get('/search', async (req, res) => {
  const searchKey = req.query.key;
  try {
    const data = await Resource.find({
      "$or": [
        { Category: { $regex: searchKey, $options: 'i' } }
      ]
    });
    res.render('resources', { data });
  } catch (err) {
    res.status(500).send(err);
  }
});

userRoutes.get('/editUser', async (req, res) => {
  try {
    const users = await Users.find();
    res.render('editUser', { arr: users });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving data');
  }
});



userRoutes.post('/password', async (req, res) => {
  try {
      const { currentPassword, newPassword, confirmPassword } = req.body;
      const userId = req.session.user._id; 
  
      const user = await Users.findById(userId);

      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      if (currentPassword !== user.Password) {
          return res.status(400).json({ success: false, message: 'Current password is incorrect' });
      }

      if (newPassword !== confirmPassword) {
          return res.status(400).json({ success: false, message: 'New password and confirm password do not match' });
      }

      user.Password = newPassword;
      await user.save();

      res.status(200).json({ success: true, message: 'Password updated successfully' });

  } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ success: false, message: 'Failed to update password' });
  }
});


module.exports = userRoutes;