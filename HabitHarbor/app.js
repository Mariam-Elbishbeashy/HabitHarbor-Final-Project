const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const Resource = require('./models/resourcedb');
const data = require('./config/resourcedata');
const userRoutes = require('./routes/user');
const Users = require('./models/userdb');
const Userdata = require('./config/userdata');
const Activities = require('./models/activitydb');
const Activitydata = require('./config/activitydata');
const Posts = require('./models/postsdb');
const Postdata = require('./config/postsdata');
const multer = require('multer');

// Importing routes
const adminRoutes = require('./routes/admin');
const indexRoutes = require('./routes/index');

// Express app
const app = express();
const port = 3000;
const dbURI = 'mongodb+srv://mariam2206043:Mariam%401234@cluster0.gcqt1qk.mongodb.net/';

// Connect to MongoDB
mongoose.connect(dbURI)
  .then(async () => {
    await Resource.deleteMany({});
    await Resource.insertMany(data);

    await Activities.deleteMany({});
    await Activities.insertMany(Activitydata);

    await Posts.deleteMany({});
    await Posts.insertMany(Postdata);

    await Users.deleteMany({});
    await Users.insertMany(Userdata);

    console.log('MongoDB connected');

    // Start express server after inserting data
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'Your_Secret_Key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use("/", userRoutes);
app.use("/", indexRoutes);
app.use("/", adminRoutes);

// Get requests
app.get('/home', async (req, res) => {
  try {
    const activities = await Activities.find();
    res.render('home', { activities });
  } catch (err) {
    console.log(err);
  }
});

app.get('/admin', (req, res) => {
  res.render('admin');
});

app.get('/', (req, res) => {
  res.render('front');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/forgetpass', (req, res) => {
  res.render('forgetpass');
});


app.get('/user', async (req, res) => {
  try {
    const users = await Users.find();
    res.render('user', { arr: users });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving data');
  }
});

app.get('/search', async (req, res) => {
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

app.get('/editUser', async (req, res) => {
  try {
    const users = await Users.find();
    res.render('editUser', { arr: users });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving data');
  }
});

// Uncomment and modify this route in app.js
app.put("/editUser/:id", async (req, res) => {
  const userId = req.params.id;
  try {
      const updatedUser = await Users.findOneAndUpdate(
          { _id: userId },
          { $set: req.body },
          { new: true }
      );
      res.redirect("/user"); // Redirect to appropriate page after update
  } catch (err) {
      console.log(err);
      res.status(500).send("Error updating user information");
  }
});

