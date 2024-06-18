const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');
const Resource = require('./models/resourcedb');
const data = require('./config/resourcedata');
const Users = require('./models/userdb');
const Userdata = require('./config/userdata');
const Activities = require('./models/activitydb');
const Activitydata = require('./config/activitydata');


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

    await Users.deleteMany({}); 
    const result1 = await Users.insertMany(Userdata);
    console.log(`${result1.length} documents inserted successfully`);

    await Activities.deleteMany({}); 
    const result2 = await Activities.insertMany(Activitydata);
    console.log(`${result2.length} documents inserted successfully`);


    // Start express server after inserting data
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch(err => console.log(err));


app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


// app.use("/", indexRoutes);
// app.use("/user", userRoutes);
// app.use("/admin", adminRoutes);

app.get('/home', (req, res) => {
  res.render('home');
});

app.get('/posts', (req, res) => {
  res.render('posts');
});

app.get('/admin', (req, res) => {
  res.render('admin');
});

app.post('/admin', (req, res) => {
  console.log(req.body)

  const activity = new Activities(req.body);
  activity.save().then(() =>{
    res.redirect("/admin")
  }).catch((err)=>{
    console.log(err);
  });

  
});


app.get('/', (req, res) => {
  res.render('front');
});


app.get('/resources', async (req, res) => {
  try {
    const resources = await Resource.find({});
    res.render('resources', { data: resources });
  } catch (err) {
    res.status(500).send(err);
  }
});




app.get('/', async (req, res) => {
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

//404 page
// app.use((req, res) => {
//   res.status(404).render('404', { user: (req.session.user === undefined ? "" : req.session.user) });
// });
