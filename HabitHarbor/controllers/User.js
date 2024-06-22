const Postdb = require('../models/postsdb');
const Users = require('../models/userdb');
const Resource = require('../models/resourcedb');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const multer = require('multer'); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10 
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Only JPG, JPEG, or PNG files are allowed!'), false);
    }
    cb(null, true);
  }
});

const savePost = (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).send('Error uploading file');
    }

    const user = req.session.user;
    const imageName = req.file.filename;
    const imagePath = path.join('uploads', imageName);
    const userProfilePath = path.join('uploads', user.Image);

    const postdb = new Postdb({
      text: req.body.text,
      imageUploaded: imagePath,
      userName: user.Firstname, 
      userProfile: userProfilePath 
    });

    postdb.save()
      .then(() => {
        res.redirect('/posts');
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error saving post');
      });
  });
};

const commentPost = (req, res) => {
    const { id } = req.params;
    const { commentText } = req.body;
  
    const user = req.session.user;
    const userName = user.Firstname;
    const userProfile = path.join('uploads', user.Image);
  
    Postdb.findByIdAndUpdate(
      id,
      { $push: { comments: { userName, userProfile, commentText } } },
      { new: true }
    )
      .then(() => {
        res.redirect("/posts");
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error saving comment");
      });
  };
  

const getPosts = (req, res) => {
  Postdb.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      res.render("posts", { posts });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Failed to fetch posts' });
    });
};

let searchTerms = [];
const getResources = async (req, res) => {
  const searchKey = req.query.key;
  try {
    let resources;

    resources = await Resource.find(searchKey ? { Category: { $regex: searchKey, $options: 'i' } } : {});

    const message = resources.length === 0 ? 'No data found.' : null;

    if (searchKey && resources.length > 0 && !searchTerms.includes(searchKey)) {
      searchTerms.push(searchKey);
    }

    res.render('resources', { data: resources, message, searchTerms });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getResources,
  savePost,
  commentPost,
  getPosts
};
