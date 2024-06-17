const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

// express app
const app = express();
const port = 3000;
const dbURI = ''
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(result => app.listen(8080))
//   .catch(err => console.log(err));

 app.use(express.urlencoded({ extended: true }));

// // default options
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


//404 page
// app.use((req, res) => {
//   res.status(404).render('404', { user: (req.session.user === undefined ? "" : req.session.user) });
// });
app.listen(port, () =>{
  console.log("app listening on port 3000");
});