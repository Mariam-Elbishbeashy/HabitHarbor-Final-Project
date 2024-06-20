const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const Resource = require('./models/resourcedb');
const data = require('./config/resourcedata');
const Users = require('./models/userdb');
const Userdata = require('./config/userdata');
const Activities = require('./models/activitydb');
const Activitydata = require('./config/activitydata');

//Importing controllers
const AdminController = require('./controllers/Admin');

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
app.use(methodOverride('_method'));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


// app.use("/", indexRoutes);
// app.use("/user", userRoutes);
// app.use("/admin", adminRoutes);

app.get('/home', (req, res) => {
  Activities.find().then((activities)=>{
    res.render('home',{activities:activities});
  }).catch((err)=>{
    console.log(err);
  })
  
});

app.get('/posts', (req, res) => {
  res.render('posts');
});

app.get('/admin', (req, res) => {
  res.render('admin');
});
//saving new activities to database
app.post('/admin', AdminController.saveActivity);
//displaying activities
app.get('/api/activities', AdminController.getActivities);
//deleting activities
app.delete('/admin/deleteactivities/:id', AdminController.deleteActivity);
//editing activities
app.put('/admin/editactivity/:id', AdminController.editActivity);
//saving new users to database
app.post('/admin/adduser', AdminController.saveUser);
//displaying users
app.get('/api/users', AdminController.getUsers);
//displaying admins
app.get('/api/admins', AdminController.getUsers);
//deleting users
app.delete('/admin/deleteusers/:id', AdminController.deleteUser);
//editing users
app.put('/admin/editusers/:id', AdminController.editUser);
//saving new resources to database
app.post('/admin/saverecource', AdminController.saveRecource);
//displaying resources
app.get('/api/resources', AdminController.getResources);
//deleting resources
app.delete('/admin/deleteresources/:id', AdminController.deleteResource);
//editing resources
app.put('/admin/editresource/:id', AdminController.editResource);




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
