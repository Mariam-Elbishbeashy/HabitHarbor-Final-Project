const ActivityRecords = require('../models/activityRecordsdb');

// Function to count the total number of habits done by a certain username
const countUserHabits = (req, res) => {
    const { username } = req.params;

    ActivityRecords.countDocuments({ username: username })
        .then(count => {
            res.json({ username: username, habitCount: count });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error counting user habits');
        });
};
const getUserHabits = (req, res) => {
    const { username } = req.params;

    ActivityRecords.find({ username: username })
        .then(habits => {
            res.json(habits);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching user habits');
        });
};
const getTotalHabitsPerMonth = (req, res) => {
    const { username } = req.params;

    ActivityRecords.aggregate([
        { $match: { username: username } },
        { $group: {
            _id: { month: '$monthOfCompletion' },
            totalHabits: { $sum: 1 }
        }}
    ])
    .then(results => {
        const data = results.map(item => ({
            month: item._id.month,
            totalHabits: item.totalHabits
        }));
        res.json(data);
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Error fetching total habits per month');
    });
};
module.exports = {
    countUserHabits, 
    getUserHabits,
    getTotalHabitsPerMonth
};
