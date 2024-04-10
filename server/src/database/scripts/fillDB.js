const db = require('../mongo-db'); // Replace with the actual path to your db module

// Initialize database connection
db.start('mongodb://localhost:27018/nfluencr', async () => {
    console.log('Connected to Database');

    try {
        // Adding Companies
        const company1 = new db.models.Company({
            name: 'Tech Co',
            email: 'techco@example.com',
            address: '123 Tech Street'
        });
        await company1.save();
        console.log('Company 1 added');

        const company2 = new db.models.Company({
            name: 'Design Inc',
            email: 'designinc@example.com',
            address: '456 Design Ave'
        });
        await company2.save();
        console.log('Company 2 added');

        // Adding Influencers
        const influencer1 = new db.models.Influencer({
            name: 'Influencer One',
            email: 'influencer1@example.com'
        });
        await influencer1.save();
        console.log('Influencer 1 added');

        const influencer2 = new db.models.Influencer({
            name: 'Influencer Two',
            email: 'influencer2@example.com'
        });
        await influencer2.save();
        console.log('Influencer 2 added');

        // Adding Jobs
        const job1 = new db.models.Job({
            company: company1._id,
            title: 'Frontend Developer',
            description: 'Develop amazing UI',
            location: 'Remote'
        });
        await job1.save();
        console.log('Job 1 added');

        const job2 = new db.models.Job({
            company: company2._id,
            title: 'Graphic Designer',
            description: 'Create engaging graphics',
            location: 'New York'
        });
        await job2.save();
        console.log('Job 2 added');

        // Adding JobMap
        const jobMap1 = new db.models.JobMap({
            job: job1._id,
            influencer: influencer1._id
        });
        await jobMap1.save();
        console.log('JobMap 1 added');

        const jobMap2 = new db.models.JobMap({
            job: job2._id,
            influencer: influencer2._id
        });
        await jobMap2.save();
        console.log('JobMap 2 added');

        // Adding Notifications
        const notification1 = new db.models.Notification({
            company: company1._id,
            influencer: influencer1._id,
            job: job1._id,
            message: 'Your application is received'
        });
        await notification1.save();
        console.log('Notification 1 added');

        // Adding Users
        const user1 = new db.models.User({
            email: 'user1@example.com',
            password: 'password1',
            accountType: 'admin'
        });
        await user1.save();
        console.log('User 1 added');

        const user2 = new db.models.User({
            email: 'user2@example.com',
            password: 'password2',
            accountType: 'influencer'
        });
        await user2.save();
        console.log('User 2 added');

    } catch (err) {
        console.error('Error initializing mock data:', err);
    }
});
