const Postdb = require('../models/postsdb');
const Users = require('../models/userdb');
const Resource = require('../models/resourcedb');
const Activities = require('../models/activitydb');
const Badgesdb = require('../models/badgesdb')
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
    if (!req.session.user) {
        return res.status(401).send('User not logged in');
    }

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
    const daysOfProgress = 1;
    const Progress = ((daysOfProgress-1)/7)*100 ;
    if ( Content===''){
        console.log("empty");
        return;
    }

    try {
        const updatedUser = await Users.findByIdAndUpdate(
            id,
            { $push: { customChallenge: { Type, Content, Progress, daysOfProgress } } },
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
    const daysOfProgress = 1;
    const Progress = ((daysOfProgress-1)/30)*100 ;
    if ( Content===''){
        console.log("empty");
        return;
    }

    try {
        const updatedUser = await Users.findByIdAndUpdate(
            id,
            { $push: { customChallenge: { Type, Content, Progress, daysOfProgress } } },
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
const Addprogress = async (req, res) => {
    try {
        const userId = req.params.id;
        const challengeIndex = req.body.challengeIndex;

        // Find the user by ID
        const user = await Users.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Increment the daysOfProgress for the specific challenge
        if (user.customChallenge[challengeIndex].Type === "weekly") {
            user.customChallenge[challengeIndex].daysOfProgress += 1;
            user.customChallenge[challengeIndex].Progress = ((user.customChallenge[challengeIndex].daysOfProgress - 1) / 7) * 100;
        }

        // Save the updated user
        await user.save();
        req.session.user = user;

        // Redirect or respond as needed
        res.redirect('/home'); // Adjust the redirect URL as needed
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
const AddprogressM = async (req, res) => {
    try {
        const userId = req.params.id;
        const challengeIndex = req.body.challengeIndex;

        // Find the user by ID
        const user = await Users.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Increment the daysOfProgress for the specific challenge
        if (user.customChallenge[challengeIndex].Type === "monthly") {
            user.customChallenge[challengeIndex].daysOfProgress += 1;
            user.customChallenge[challengeIndex].Progress = ((user.customChallenge[challengeIndex].daysOfProgress - 1) / 30) * 100;
        }

        // Save the updated user
        await user.save();
        req.session.user = user;

        // Redirect or respond as needed
        res.redirect('/home'); // Adjust the redirect URL as needed
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
module.exports = {
   getResources,
   savePost,
   commentPost,
   getPosts,
   AddcustomActivity,
   selectActivity,
   AddcustomWeeklyActivity,
   AddcustomMonthlyActivity,
   Addprogress,
   AddprogressM
};

