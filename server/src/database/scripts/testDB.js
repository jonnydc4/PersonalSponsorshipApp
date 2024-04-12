const database = require('../mongo-db.js');

database.start('mongodb://localhost:27018/nfluencr', async () => {
    try {
        // Fetch all users from the User model
        await database.find(database.models.User, {}).then(users => {
            console.log('Users:', users);
        }).catch(error => {
            console.error('Error:', error);
        });
    } catch (error) {
        console.error('Error:', error);
    }
});
