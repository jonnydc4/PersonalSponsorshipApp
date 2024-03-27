const database = require('../mongo-db.js');

database.start('mongodb://localhost:27018/nfluencr', (db) => {
    if (!db) {
        console.error('Failed to connect to the database');
        return;
    }

    try {
        // Perform database operations here
        // For example:
        database.findOne(database.models.User, { 'id': 1 }).then(user => {
            console.log(user);
        }).catch(error => {
            console.error('Error:', error);
        });
    } catch (error) {
        console.error('Error:', error);
    }
});
