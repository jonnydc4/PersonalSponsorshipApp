const db = require('../mongo-db'); // Replace with the actual path to your db module

// Initialize database connection
db.start('mongodb://localhost:27018/nfluencr', async () => {
    console.log('Connected to Database');

    try {
        // Create a new user instance using db.models.User
        const newUser = new db.models.User({
            email: 'n@email.com',
            password: 'password',
            userType: 'influencer',
            influencerDetails: {
                name: 'amongus',
                // other influencer specific details
            }
            // Note: No companyDetails since this is an influencer
        });

        // Save the new user
        await db.save(newUser);
        console.log('Second Mock User added!');
    } catch (err) {
        console.error('Error adding mock user:', err);
    }
});
