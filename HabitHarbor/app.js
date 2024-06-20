const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');
const Resource = require('./models/resourcedb');
const data = require('./config/resourcedata');
const session=require('express-session');
const userRoutes=require('./routes/user');



// express app
const app = express();
const port = 3000;
const dbURI = 'mongodb://localhost:27017/HabitHarborDB';

// Connect to MongoDB
mongoose.connect(dbURI)
  .then(async () => {
    await Resource.deleteMany({}); 
    const result = await Resource.insertMany(data);
    console.log(`${result.length} documents inserted successfully`);

   



    // Start express server after inserting data
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch(err => console.log(err));


app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
   secret: 'Your_Secret_Key',
  resave:false,
saveUninitialized:false,
cookie:{maxAge:60000} }));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});
app.get('/set-session', (req, res) => {
  req.session.testValue = 'Session is working!';
  res.send('Session value set!');
});

app.get('/get-session', (req, res) => {
  const sessionValue = req.session.testValue || 'No session value found';
  res.send(`Session value: ${sessionValue}`);
});



// app.use("/", indexRoutes);
 app.use("/", userRoutes);
// app.use("/admin", adminRoutes);


//get requests
app.get('/home', (req, res) => {
  res.render('home',{user:req.session.user});
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


//404 page
// app.use((req, res) => {
//   res.status(404).render('404', { user: (req.session.user === undefined ? "" : req.session.user) });
// });





