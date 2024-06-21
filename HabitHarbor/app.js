const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const Resource = require('./models/resourcedb');
const Badgesdb = require('./models/badgesdb');
const badgesData = require('./config/badgesdata');
const data = require('./config/resourcedata');
const session=require('express-session');
const userRoutes=require('./routes/user');
const Users = require('./models/userdb');
const Userdata = require('./config/userdata');
const Activities = require('./models/activitydb');
const Activitydata = require('./config/activitydata');
const Posts = require('./models/postsdb');
const Postdata = require('./config/postsdata');

//importing routes
const adminRoutes = require('./routes/admin')
const indexRoutes = require('./routes/index');

// express app
const app = express();
const port = 3000;
const dbURI = 'mongodb+srv://mariam2206043:Mariam%401234@cluster0.gcqt1qk.mongodb.net/';

// Connect to MongoDB
mongoose.connect(dbURI)
  .then(async () => {
    await Resource.deleteMany({}); 
    const result = await Resource.insertMany(data);
    console.log(`${result.length} documents inserted successfully`);

     await Badgesdb.deleteMany({}); 
     const result2 = await Badgesdb.insertMany(badgesData);
     console.log(`${result2.length} documents inserted successfully`);

    // await Posts.deleteMany({}); 
    // const result3 = await Posts.insertMany(Postdata);
    // console.log(`${result3.length} documents inserted successfully`);

    // Start express server after inserting data
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch(err => console.log(err));


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
   secret: 'Your_Secret_Key',
  resave: true,
saveUninitialized:false,
cookie:{maxAge:72000000} }));
app.set('view engine', 'ejs');     

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});
 app.use("/", userRoutes);
 app.use("/", indexRoutes);
 app.use("/", adminRoutes);

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

app.get('/home', (req, res) => {
  res.render('home',{user:req.session.user});
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



//404 page
 app.use((req, res) => {
   res.status(404).render('404', {user: req.session.user});
 });