const database = require('../database/mongo-db.js');
const messageSchema = require("./schemas/Message");

/* ------------------------User Table Queries------------------------ */
const findUserByEmail = async (email) => {
    return await database.findOne(database.models.User, {email}); // Using the model name as a string
};

const updateUserPassword = async (email, newPassword) => {
    try {
        // Find the user by email and update the password
        const updatedUser = await database.findOneAndUpdate(
            database.models.User, // Model
            {email: email}, // Query to find the user
            {$set: {password: newPassword}}, // Update operation
            {new: true} // Options (return the updated document)
        );
        console.log('Updated User:', updatedUser);
    } catch (error) {
        console.error('Error:', error);
    }
};

const createNewUser = async (id, email, password, accountType) => {
    try {
        const newUser = new database.models.User({
            _id: id, // MongoDB typically uses _id as the primary key
            email: email,
            password: password,
            accountType: accountType
        });

        // Save the new user to the database
        const savedUser = await database.save(newUser);
        console.log('New User Created:', savedUser);
        return savedUser;
    } catch (error) {
        console.error('Error:', error);
        throw error; // rethrow the error for further handling
    }
};

/* ------------------------Job Table Queries------------------------ */
const createNewJob = async (company_id, title, description, location) => {
    try {
        const newJob = new database.models.Job({
            company: company_id,
            title: title,
            description: description,
            location: location
        });

        // Save the new job to the database
        const savedJob = await database.save(newJob);
        console.log('New Job Created:', savedJob);
        return savedJob;
    } catch (error) {
        console.error('Error:', error);
        throw error; // rethrow the error for further handling.
    }
};

const getJobTable = async () => {
    try {
        // Retrieve all job documents from the database
        const jobs = await database.find(database.models.Job, {});
        console.log('Retrieved Jobs:', jobs);
        return jobs;
    } catch (error) {
        console.error('Error:', error);
        throw error; // rethrow the error for further handling
    }
};

const getJobsByCompanyId = async (companyId) => {
    try {
        // Retrieve all job documents from the database where company_id matches
        const jobs = await database.find(database.models.Job, {company_id: companyId});
        console.log('Retrieved Jobs for Company ID:', companyId, jobs);
        return jobs;
    } catch (error) {
        console.error('Error:', error);
        throw error; // rethrow the error for further handling
    }
};

/* ------------------------Job map Table Queries------------------------ */
const getJobMapTable = async () => {
    try {
        // Retrieve all documents from the JobMap collection in the database
        const jobMaps = await database.find(database.models.JobMap);
        console.log('Retrieved Job Map:', jobMaps);
        return jobMaps;
    } catch (error) {
        console.error('Error:', error);
        throw error; // rethrow the error for further handling
    }
};

/* ------------------------Company Table Queries------------------------ */
const getCompanyTable = async () => {
    try {
        // Retrieve all documents from the Company collection in the database
        const companies = await database.find(database.models.Company);
        console.log('Retrieved Companies:', companies);
        return companies;
    } catch (error) {
        console.error('Error:', error);
        throw error; // rethrow the error for further handling
    }
};
const getCompanyById = async (companyId) => {
    try {
        // Find a specific company by its ID
        const company = await database.findOne(database.models.Company, {id: companyId});
        console.log('Retrieved Company:', company);
        return company;
    } catch (error) {
        // console.error('Error from database.js:', error);
        return null
    }
};

const createNewCompany = async (id, companyName, address) => {
    try {
        // Create a new company object
        const newCompany = new database.models.Company({
            id: id,  // or simply use an autogenerated ObjectId by MongoDB
            name: companyName,
            address: address
        });

        // Insert the new company into the 'Company' collection
        const savedCompany = await database.save(newCompany);
        console.log('Company Created:', savedCompany);
        return savedCompany;
    } catch (error) {
        console.error('Error creating new company (database.js):', error);
        throw error; // rethrow the error for further handling
    }
};

/* ------------------------Influencer Table Queries------------------------ */
const getInfluencerTable = async () => {
    try {
        // Fetch all documents from the 'Influencer' collection
        const influencers = await database.find(database.models.Influencer);
        console.log('Fetched Influencers:', influencers);
        return influencers;
    } catch (error) {
        console.error('Error:', error);
        throw error; // rethrow the error for further handling
    }
};

const getInfluencerById = async (influencerId) => {
    try {
        // Find the influencer document by its ID in the 'Influencer' collection
        const influencer = await database.findOne(database.models.Influencer, {id: influencerId});
        console.log('Fetched Influencer:', influencer);
        return influencer;
    } catch (error) {
        // console.error('Error from database.js:', error);
        return null
    }
};

const createNewInfluencer = async (id, firstName, lastName, userName) => {
    try {
        // Create a new influencer object
        // This could realistically be made into a single line. But splitting it up is easier to read.
        const newInfluencer = new database.models.Influencer({
            id: id, // MongoDB typically uses _id as the identifier
            firstName: firstName,
            lastName: lastName,
            userName: userName
        });

        // Save the new influencer document to the database
        const savedInfluencer = await database.save(newInfluencer);
        console.log('Influencer created:', savedInfluencer);
        return savedInfluencer;
    } catch (error) {
        console.error('Error:', error);
        throw error; // rethrow the error for further handling
    }
};

/* ------------------------Notification Table Queries------------------------ */
const getNotificationTable = async () => {
    try {
        // Fetch all notifications from the database
        const notifications = await database.find(database.models.Notification);
        console.log('All notifications:', notifications);
        return notifications;
    } catch (error) {
        console.error('Error:', error);
        throw error; // rethrow the error for further handling
    }
};

const addJobToInfluencer = async (influencerId, jobId) => {
    try {
        // Update the influencer document to include the new job ID in their job list
        await database.update(
            database.models.Influencer,
            {_id: influencerId},
            {$addToSet: {jobs: jobId}}
        );
        console.log(`Job ${jobId} added to influencer ${influencerId}`);
    } catch (error) {
        console.error('Error:', error);
        throw error; // rethrow the error for further handling
    }
};

const createNewNotification = async (company_id, influencer_id, job_id, message) => {
    try {
        // Create a new notification document
        const notification = new database.models.Notification({
            company_id,
            influencer_id,
            job_id,
            message,
            is_read: false,
            notification_time: new Date() // Current time
        });

        // Insert the notification into the database
        await database.save(
            database.models.Notification,
            notification
        );
        console.log(`Notification created for influencer ${influencer_id}`);
    } catch (error) {
        console.error('Error:', error);
        throw error; // rethrow the error for further handling
    }
};

const getJobOffersForInfluencer = async (influencerId) => {
    try {
        // Perform a query to fetch job offers for the influencer
        const jobOffers = await database.find(
            database.models.Notification,
            {influencer_id: influencerId}
        );

        // Optionally, perform additional queries to fetch related job and company details
        // This is necessary if the necessary job and company data is not embedded in the notifications

        // For each notification, fetch the job and company details
        const detailedJobOffers = await Promise.all(
            jobOffers.map(async (offer) => {
                const job = await database.findOne(database.models.Job, {_id: offer.job_id});
                const company = await database.findOne(database.models.Company, {_id: job.company_id});

                return {
                    ...offer,
                    jobTitle: job.title,
                    jobDescription: job.description,
                    jobLocation: job.location,
                    companyName: company.name
                };
            })
        );

        return detailedJobOffers;
    } catch (error) {
        console.error('Error:', error);
        throw error; // rethrow the error for further handling
    }
};

//delete the notification from the table
const removeNotification = async (offerId) => {
    try {
        // Use the deleteOne method to remove the notification
        await database.deleteOne(database.models.Notification, {_id: offerId});

        // You can return a response or handle the result as needed
        console.log(`Notification with ID ${offerId} has been successfully removed.`);
    } catch (error) {
        console.error('Error removing notification:', error);
        throw error; // rethrow the error for further handling
    }
};


/* ------------------------Message and Message Room Queries------------------------ */
const getAllMessagesRoomsForUser = async (userId) => {
    try {

        const chatRooms = await database.find(database.models.MessageRoom, {
                $or: [
                    {company: userId},
                    {influencer: userId}
                ]
            }
        )

        return chatRooms
    } catch (error) {

    }
}

const createNewMessagesRoom = async (influencerId, companyId) => {
    try {
        const newMessageRoom = new database.models.MessageRoom({
            company: companyId,
            influencer: influencerId,
            messages: []
        });

        database.save(newMessageRoom);

    } catch (error) {
        console.error('Error creating new message room:', error);
        throw error; // rethrow the error for further handling
    }
}

const createNewMessage = async (messageRoomId, senderId, message) => {
    try {
        const newMessage = new database.models.Message({
            content: message,
            sender: senderId
        });

        const messageRoom = await database.findOne(database.models.MessageRoom, {_id: messageRoomId});
        messageRoom.messages.push(newMessage);

    } catch (error) {
        console.error(error);
        throw error; // rethrow the error for further handling
    }
}


module.exports = {
    findUserByEmail,
    updateUserPassword,
    createNewJob,
    getJobTable,
    getCompanyTable,
    getInfluencerTable,
    getJobsByCompanyId,
    getNotificationTable,
    createNewNotification,
    getJobOffersForInfluencer,
    addJobToInfluencer,
    removeNotification,
    createNewUser,
    createNewInfluencer,
    createNewCompany,
    getInfluencerById,
    getCompanyById,
    createNewMessagesRoom,
    createNewMessage,
    getAllMessagesRoomsForUser
};

