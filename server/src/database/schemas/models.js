const mongoose = require('mongoose');

module.exports = {
    User: require('./User'),
    Company: require('./Company'),
    Influencer: require('./Influencer'),
    Job: require('./Job'),
    JobMap: require('./JobMap'),
    Notification: require('./Notification'),
    MessageRoom: require('./MessageRoom'),
    Message: require('./Message'),
};
