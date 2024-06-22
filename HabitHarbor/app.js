const express = require('express');
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

    console.log('MongoDB connected');

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));

  
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));
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

app.get('/feedback', (req, res) => {
  res.render('feedback');
});

app.get('/password', (req, res) => {
  res.render('password');
});


