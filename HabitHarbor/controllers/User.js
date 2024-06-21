const Postdb = require('../models/postsdb');
const Users = require('../models/userdb');
const Resource = require('../models/resourcedb');
const Activities = require('../models/activitydb');
const Badgesdb = require('../models/badgesdb')
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const savePost = (req, res) => {

    if (!req.session.user) {
        return res.status(401).send('User not logged in');
    }

    if (!req.files || !req.files.image) {
        return res.status(400).send('No file uploaded');
    }

    const user = req.session.user; 
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
            userName: user.Firstname,
            userProfile: user.Image,
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
// function removeDuplicates(user) {
//     // Check if user.customChallenge exists and is an array
//     if (!user.customChallenge || !Array.isArray(user.customChallenge)) {
//         return user; // Return user object as is if customChallenge is not valid
//     }

//     // Filter out duplicates based on unique identifiers (e.g., _id)
//     user.customChallenge = user.customChallenge.filter((challenge, index, self) =>
//         index === self.findIndex((t) => (
//             t._id === challenge._id
//         ))
//     );

//     return user;
// }

const customActivity = (req, res) => {
    const { id } = req.params;
    const { Title, Content } = req.body;

    Users.findByIdAndUpdate(
        id,
        { $push: { customChallenge: { Title, Content } } },
        { new: true }
    )
    .then(updatedUser => {
        Activities.find()
        .then(activities => {
            console.log("Custom activity added successfully");

            // Clear input fields after successful submission
            req.body.Title = '';
            req.body.Content = '';
            // const uniqueActivities = removeDuplicates(user);
            // console.log(uniqueActivities);
             res.redirect("/home");
        })
        .catch(err => {
            console.error("Failed to fetch activities:", err);
            res.status(500).json({ error: 'Failed to fetch activities' });
        });
    })
    .catch(err => {
        console.error("Error saving custom activity:", err);
        res.status(500).send("Error saving custom activity");
    });
};



const commentPost = (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('User not logged in');
    }

    const { id } = req.params;
    const user = req.session.user;  
    const { commentText } = req.body;

    Postdb.findByIdAndUpdate(
        id,
        { $push: { comments: { userName: user.Firstname, userProfile: user.Image, commentText } } },
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

const getPosts = async (req, res) => {
    try {
        const posts = await Postdb.find().sort({ createdAt: -1 });
        const badges = await Badgesdb.find();
        res.render("posts", { posts, badges, user: req.session.user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};

let searchTerms = []; 
const getResources = async (req, res) => {
    const searchKey = req.query.key;
    try {
      let resources;
  
      resources = await Resource.find(searchKey ? { Category: { $regex: searchKey, $options: 'i' } } : {});
    
      const message = resources.length === 0 ? 'No data found.' : null;
      const badges = await Badgesdb.find();
  
      if (searchKey && resources.length > 0 && !searchTerms.includes(searchKey)) {
        searchTerms.push(searchKey);
      }
      res.render('resources', { data: resources, message, searchTerms, badges, user: req.session.user }); 

    } catch (err) {
      res.status(500).send(err);
    }
  };
module.exports = {
   getResources,
   savePost,
   commentPost,
   getPosts,
   customActivity
};