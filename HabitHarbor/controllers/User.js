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

const selectActivity = async (req, res) => {
    try {
        const user = req.session.user;
        if (!user) {
            return res.status(401).send('User not logged in');
        }
        
        const userBMI = ((user.Weight/(user.Height * user.Height ))*10000);
        const activities = await Activities.find();
        let selectedPhysicalActivity = null;
        let selectedNutritionActivity = null;
        let selectedWellBeingActivity = null;
        for (let i = 0; i < activities.length; i++) {
            if (activities[i].category === "physical" &&
                activities[i].bmiRange.min <= userBMI && activities[i].bmiRange.max >= userBMI &&
                activities[i].ageRange.min <= user.age && activities[i].ageRange.max >= user.age) {
                selectedPhysicalActivity = activities[i];
                break;
            }
        }
        for (let j = 0; j < activities.length; j++){
            if (activities[j].category === "nutrition" &&
                activities[j].bmiRange.min <= userBMI && activities[j].bmiRange.max >= userBMI &&
                activities[j].ageRange.min <= user.age && activities[j].ageRange.max >= user.age) {
                selectedNutritionActivity = activities[j];
                break;
            }
        }
        for (let k = 0; k < activities.length; k++){
            if (activities[k].category === "well-being" &&
                activities[k].bmiRange.min <= userBMI && activities[k].bmiRange.max >= userBMI &&
                activities[k].ageRange.min <= user.age && activities[k].ageRange.max >= user.age) {
                selectedWellBeingActivity = activities[k];
                break;
            }
        }
        const badges = await Badgesdb.find();
        res.render("home", { selectedPhysicalActivity, selectedNutritionActivity, selectedWellBeingActivity, badges, user: req.session.user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to select an activity' });
    }
};

// Function to add and display custom activity
const AddcustomActivity = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('User not logged in');
    } 
    
    const { id } = req.params;
    const { Title, Content } = req.body;
    const Type = "daily";
    if (Title==='' || Content===''){
        return;
    }

    try {
        const updatedUser = await Users.findByIdAndUpdate(
            id,
            { $push: { customChallenge: { Type, Title, Content } } },
            { new: true }
        );

        // Update session user
        req.session.user = updatedUser;

        // Fetch all activities
        const activities = await Activities.find();

        console.log("Custom activity added successfully");

        res.redirect("/home");
    } catch (err) {
        console.error("Error saving custom activity:", err);
        res.status(500).send("Error saving custom activity");
    }
};
const AddcustomWeeklyActivity = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('User not logged in');
    } 
    
    const { id } = req.params;
    const { Content } = req.body;
    const Type = "weekly";
    const Progress = 0;
    if ( Content===''){
        console.log("empty");
        return;
    }

    try {
        const updatedUser = await Users.findByIdAndUpdate(
            id,
            { $push: { customChallenge: { Type, Content, Progress } } },
            { new: true }
        );

        // Update session user
        req.session.user = updatedUser;

        // Fetch all activities
        const activities = await Activities.find();

        console.log("Custom activity added successfully");

        res.redirect("/home");
    } catch (err) {
        console.error("Error saving custom activity:", err);
        res.status(500).send("Error saving custom activity");
    }
};
const AddcustomMonthlyActivity = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('User not logged in');
    } 
    
    const { id } = req.params;
    const { Content } = req.body;
    const Type = "monthly";
    const Progress = 0;
    if ( Content===''){
        console.log("empty");
        return;
    }

    try {
        const updatedUser = await Users.findByIdAndUpdate(
            id,
            { $push: { customChallenge: { Type, Content, Progress } } },
            { new: true }
        );

        // Update session user
        req.session.user = updatedUser;

        // Fetch all activities
        const activities = await Activities.find();

        console.log("Custom activity added successfully");

        res.redirect("/home");
    } catch (err) {
        console.error("Error saving custom activity:", err);
        res.status(500).send("Error saving custom activity");
    }
};
module.exports = {
   getResources,
   savePost,
   commentPost,
   getPosts,
   AddcustomActivity,
   checkCustomActivity,
   addActivityToUser,
   selectActivity,
   AddcustomWeeklyActivity,
   AddcustomMonthlyActivity
};