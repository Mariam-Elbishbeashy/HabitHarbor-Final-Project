const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');
const Resource = require('./models/resourcedb');
const data = require('./config/resourcedata');
const Users = require('./models/userdb');
const Userdata = require('./config/userdata');
const UserController = require('./controllers/User');


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
//app.use('/posts', router);

app.get('/home', (req, res) => {
  res.render('home');
});
app.post('/posts/saveposts', UserController.savePost);
app.post('/posts/:id/comment', UserController.commentPost);
app.get('/posts', UserController.getPosts);

app.get('/admin', (req, res) => {
  res.render('admin');
});
app.get('/', (req, res) => {
  res.render('front');
});

let searchTerms = [];
app.get('/resources', async (req, res) => {
  const searchKey = req.query.key;
  try {
    let resources;

    resources = await Resource.find(searchKey ? { Category: { $regex: searchKey, $options: 'i' } } : {});
  
    const message = resources.length === 0 ? 'No data found.' : null;

    if (searchKey && resources.length > 0 && !searchTerms.includes(searchKey)) {
      searchTerms.push(searchKey);
    }

    res.render('resources', { data: resources, message, searchTerms}); 
  } catch (err) {
    res.status(500).send(err);
  }
});

//404 page
// app.use((req, res) => {
//   res.status(404).render('404', { user: (req.session.user === undefined ? "" : req.session.user) });
// });
