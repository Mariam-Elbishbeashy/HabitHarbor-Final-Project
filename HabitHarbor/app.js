const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');

// express app
const app = express();
const dbURI = ''
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(8080))
  .catch(err => console.log(err));

 app.use(express.urlencoded({ extended: true }));

// // default options
 app.use(fileUpload());
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.use("/", indexRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { user: (req.session.user === undefined ? "" : req.session.user) });
});
