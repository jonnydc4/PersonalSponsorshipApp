const db = require('../mongo-db'); // Replace with the actual path to your db module
const User = require('../schemas/User'); // Adjust the path to your User model

// Initialize database connection
db.start('mongodb://localhost:27018/nfluencr', (database) => {
    console.log('Connected to Database');

    // Create and save the user
    const mockUser = new User({
        id: 1,
        userName: 'JohnDoe123',
        age: 30,
        email: 'johndoe123@example.com'
    });

    mockUser.save()
        .then(() => console.log('Mock user added successfully!'))
        .catch(err => console.error('Error adding mock user:', err));
});
