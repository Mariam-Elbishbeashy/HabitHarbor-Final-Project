const Activities = require('../models/activitydb');
const Users = require('../models/userdb');
const Resource = require('../models/resourcedb');



// Function to save activity
const saveActivity = (req, res) => {
    console.log(req.body);

    const activity = new Activities(req.body);
    activity.save()
        .then(() => {
            res.redirect("/admin");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error saving activity");
        });
};

// Function to get activities
const getActivities = (req, res) => {
    Activities.find()
        .then((activities) => {
            res.json(activities);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch activities' });
        });
};
// Function to save user
const saveUser = (req, res) => {
    console.log(req.body);

    const user = new Users(req.body);
    user.save()
        .then(() => {
            res.redirect("/admin");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error saving activity");
        });
};
// Function to get users
const getUsers = (req, res) => {
    Users.find()
        .then((Users) => {
            res.json(Users);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch users' });
        });
};

// Function to save resource
const saveRecource = (req, res) => {
    console.log(req.body);

    const resource = new Resource(req.body);
    resource.save()
        .then(() => {
            res.redirect("/admin");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error saving resource");
        });
};

// Function to get resources
const getResources = (req, res) => {
    Resource.find()
        .then((Resource) => {
            res.json(Resource);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch resources' });
        });
};

module.exports = {
    saveActivity,
    getActivities,
    saveUser,
    getUsers,
    saveRecource,
    getResources,
};
