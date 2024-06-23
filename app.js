const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const Resource = require('./HabitHarbor/models/resourcedb');
const Badgesdb = require('./HabitHarbor/models/badgesdb');
const badgesData = require('./HabitHarbor/config/badgesdata');
const data = require('./HabitHarbor/config/resourcedata');
const userRoutes = require('./HabitHarbor/routes/user');
const Users = require('./HabitHarbor/models/userdb');
const Userdata = require('./HabitHarbor/config/userdata');
const Activities = require('./HabitHarbor/models/activitydb');
const Activitydata = require('./HabitHarbor/config/activitydata');
const ActivityRecords = require('./HabitHarbor/models/activityRecordsdb');
const ActivityRecordsdata = require('./HabitHarbor/config/activityRecordsdata');
const Posts = require('./HabitHarbor/models/postsdb');
const Postdata = require('./HabitHarbor/config/postsdata');
const multer = require('multer');

//importing routes
const adminRoutes = require('./HabitHarbor/routes/admin');
const indexRoutes = require('./HabitHarbor/routes/index');
const analysisRoutes = require('./HabitHarbor/routes/analysisRoute');
// express app

const app = express();
const port = process.env.PORT || 3000;
const dbURI = 'mongodb+srv://mariam2206043:Mariam%401234@cluster0.gcqt1qk.mongodb.net/';

// Connect to MongoDB
mongoose.connect(dbURI)
  .then(async () => { 
    // Start express server after inserting data
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
  resave: true,
  saveUninitialized:false,
  cookie:{maxAge:72000000} }));
  app.set('view engine', 'ejs');     

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.use("/", userRoutes);
app.use("/", indexRoutes);
app.use("/", adminRoutes);
app.use("/", analysisRoutes);


//get requests
app.get('/home', async (req, res) => {
  try {
    const activities = await Activities.find();
    const badges = await Badgesdb.find();
    res.render('home', { activities, badges, user: req.session.user });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});



app.get('/admin', (req, res) => {
  res.render('admin');
});

app.get('/', (req, res) => {
  res.render('front');
});


app.get('/analysis', async (req, res) => {
  const badges = await Badgesdb.find();
  res.render('analysis', {badges, user: req.session.user});
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

//404 page
 app.use((req, res) => {
   res.status(404).render('404', {user: req.session.user});
 });
