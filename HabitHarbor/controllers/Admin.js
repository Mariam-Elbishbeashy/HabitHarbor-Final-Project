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

// Function to delete activity
const deleteActivity = (req, res) => {
    const activityId = req.params.id;

    Activities.findByIdAndDelete(activityId)
        .then(() => {
            console.log(`Activity with ID ${activityId} deleted successfully`);
            res.redirect('/admin'); 
        })
        .catch((err) => {
            console.error(`Error deleting activity with ID ${activityId}:`, err);
            res.status(500).send('Error deleting user');
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
// Function to delete users
const deleteUser = (req, res) => {
    const userId = req.params.id;

    Users.findByIdAndDelete(userId)
        .then(() => {
            console.log(`User with ID ${userId} deleted successfully`);
            res.redirect('/admin'); // Redirect to appropriate page after deletion
        })
        .catch((err) => {
            console.error(`Error deleting user with ID ${userId}:`, err);
            res.status(500).send('Error deleting user');
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
// Function to delete resource
const deleteResource = (req, res) => {
    const resourceId = req.params.id;

    Resource.findByIdAndDelete(resourceId)
        .then(() => {
            console.log(`Resource with ID ${resourceId} deleted successfully`);
            res.redirect('/admin'); 
        })
        .catch((err) => {
            console.error(`Error deleting resource with ID ${resourceId}:`, err);
            res.status(500).send('Error deleting user');
        });
};

module.exports = {
    saveActivity,
    getActivities,
    deleteActivity,
    saveUser,
    getUsers,
    deleteUser,
    saveRecource,
    getResources,
    deleteResource,
};
