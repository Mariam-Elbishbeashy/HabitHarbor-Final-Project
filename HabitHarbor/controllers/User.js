const Postdb = require('../models/postsdb');
const Users = require('../models/userdb');
const Resource = require('../models/resourcedb');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const savePost = (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).send('No file uploaded');
    }

    const image = req.files.image;
    const imageName = uuidv4() + '_' + image.name; 

    const imagesDir = path.join(__dirname, '..', 'public', 'images');
    
    // Ensure the images directory exists
    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
    }

    const imagePath = path.join(imagesDir, imageName);

    image.mv(imagePath, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error uploading file');
        }

        const postdb = new Postdb({
            text: req.body.text,
            imageUploaded: path.join('images', imageName), 
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
    const { userName, userProfile, commentText  } = req.body;

    Postdb.findByIdAndUpdate(
        id,
        { $push: { comments: { userName, userProfile, commentText  } } },
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