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
        return jobs;
    } catch (error) {
        console.error('Error:', error);
        throw error; // rethrow the error for further handling
    }
};

const getJobsByCompanyId = async (companyId) => {
    try {
        // Retrieve all job documents from the database where company_id matches

        const jobs = await database.find(database.models.Job, { company: companyId });

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
        return company;
    } catch (error) {
        // console.error('Error from database.js:', error);
        return null
    }
};

const getCompanyIdByName = async (name) => {
    try {
        // Attempt to retrieve the company by exact name
        let company = await database.findOne(database.models.Company, {name: name});

        // If no company is found, perform a fuzzy search
        if (!company) {
            const regex = new RegExp(name, 'i'); // 'i' for case-insensitive matching
            company = await database.findOne(database.models.Company, {name: {$regex: regex}});

            // If still no company is found, you might want to handle it (e.g., return null or throw an error)
            if (!company) {
                console.error('No company found for:', name);
                return null; // or throw new Error('No company found');
            }
        }

        return company.id;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error for further handling
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
        return influencer;
    } catch (error) {
        // console.error('Error from database.js:', error);
        return null
    }
};

const getInfluencerIdByUsername = async (username) => {
    try {
        // Retrieve all job documents from the database where company_id matches
        const influencer = await database.findOne(database.models.Influencer, {userName: username});
        return influencer.id;
    } catch (error) {
        console.error('Error:', error);
        throw error; // rethrow the error for further handling
    }
}

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
        const newMap = database.models.JobMap({
            influencer: influencerId,
            job: jobId
        })

        // Update the influencer document to include the new job ID in their job list
        await newMap.save();
        console.log(`Job ${jobId} added to influencer ${influencerId}`);
    } catch (error) {
        console.error('Error:', error);
        throw error; // rethrow the error for further handling
    }
};

const createNewNotification = async (company_id, influencer_id, job_id, message) => {
    try {
        // Assuming 'Notification' is correctly imported at the top of your file
        const Notification = database.models.Notification;

        // Create a new notification document
        const notification = new Notification({
            company: company_id,
            influencer: influencer_id,
            job: job_id,
            message: message,
            isRead: false, // Ensure property names match your schema definitions
            notificationTime: new Date() // Current time
        });

        // Save the notification using Mongoose's `.save()` method
        const savedNotification = await notification.save();
        console.log(`Notification created for influencer ${influencer_id}`, savedNotification);
        return savedNotification;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw error; // rethrow the error for further handling
    }
};

const getJobOffersForInfluencer = async (influencerId) => {
    try {

        // Fetch notifications directly related to the influencer
        const jobOffers = await database.find(database.models.Notification, { influencer: influencerId });
        console.log("Job offers fetched: ", jobOffers);
        
        // Check if there are any job offers
        if (!jobOffers || jobOffers.length === 0) {
            console.log(`No job offers found for influencer ID: ${influencerId}`);
            return [];
        }

        const fullJobOffer = await Promise.all (
            jobOffers.map(async(jobOffer) => {
                if (!jobOffer.job) {
                    console.log(`The notification joboffer with ID ${jobOffer._id} has no job linked`);
                    return { ...jobOffer.toObject(), jobTitle: "Unknown job title", jobDescription: "Unkown", companyName: "no company"};
                }


                //Fetch job details using the jobID
               // const job = await database.find(database.models.Job, {id: jobOffer.job});
                const job = await database.models.Job.findById(jobOffer.job).exec();
                if (!job) {
                    console.log(`Job not found for ID ${jobOffer.job}`)
                    return { ...jobOffer.toObject(), jobTitle: "Unknown job title", jobDescription: "Unkown", companyName: "no company"};
                }
                
                
                return {
                    ...jobOffer.toObject(),
                    title: job.title,
                    jobDescription: job.description,
                    location: job.location,
                    

                }
                
                
            })
        );

        // Return the fetched job offers directly
        console.log("The full job offer is: ", fullJobOffer);
        return fullJobOffer;
    } catch (error) {
        console.error('Error fetching job offers for influencer:', error);
        throw error;
    }
};






//delete the notification from the table
const removeNotification = async (offerId) => {
    try {
        // Use the deleteOne method to remove the notification
        await database.deleteOne(database.models.Notification, {_id: offerId});

        // You can return a response or handle the result as needed
        console.log(`Notification with ID ${offerId} has been successfully removed.`);
        return {message: 'Job offer rejected successfully'};
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
                    {user1Id: userId},
                    {user2Id: userId}
                ]
            }
        )

        return chatRooms
    } catch (error) {
        console.error(error)
    }
}

const createNewMessagesRoom = async (user1Id, user1Name, user2Id, user2Name) => {
    try {
        const newMessageRoom = new database.models.MessageRoom({
            user1Id: user1Id,
            user1Name: user1Name,

            user2Id: user2Id,
            user2Name: user2Name,

            messages: []
        });

        const savedChatRoom = await database.save(newMessageRoom);
        return savedChatRoom
    } catch (error) {
        console.error('Error creating new message room:', error);
        throw error; // rethrow the error for further handling
    }
}

const createNewMessage = async (messageRoomId, senderId, message) => {
    try {
        const newMessage = new database.models.Message({
            text: message,
            sender: senderId
        });

        const messageRoom = await database.findOne(database.models.MessageRoom, {_id: messageRoomId});
        messageRoom.messages.push(newMessage);
        await messageRoom.save();

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
    getAllMessagesRoomsForUser,
    getInfluencerIdByUsername,
    getCompanyIdByName
};
