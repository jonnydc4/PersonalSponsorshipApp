// Functions here should be 100% reusable
const model = require('../models/model');
const {v4 : uuidv4} = require('uuid')

const isUserEmail = async (email) => {
    const user = await model.findUserByEmail(email)
    return user != null;
}

const isNotANumber = (string) => {
    const radix = 10
    return isNaN(parseInt(string, radix))
}

const encryptPassword = async (password) => {
    // Encrypts password before saving to database (function returns a encrypted password) 
    const saltRounds = 10; 
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    return encryptedPassword;
};

const comparePassword = async (password, hashedPassword) => {
    // Used to pass in the password and the hashed password to compare them. 
    // Returns true if they match, false if not.
    return await bcrypt.compare(password, hashedPassword);
};

const generateUniqueId = () => {
    return uuidv4()
}

const loadTestData = async () => {
    // Edit this data as needed for pre-loaded test data.

    try {
        // Load a test influencer
        let id = generateUniqueId()
        let name = "John Travolta"
        let email = "JT@gmail.com"
        let password = "thunderbird"


        // Check if the data has been loaded already and returns nothing if it has.
        let testUser = await model.findUserByEmail(email)
        if (typeof testUser != 'undefined') return

        await model.createNewUser(id, email, password, "influencer")
        await model.createNewInfluencer(id, name, email)

        // Load a test company
        id = generateUniqueId()
        name = "Warner Brothers"
        email = "wb@gmail.com"
        let address = "523 Hollywood Blvd"

        await model.createNewUser(id, email, password, "company")
        await model.createNewCompany(id, name, email, address)

        // Load a test job
        await model.createNewJob(id,"Actor", "Need a Movie Star", "Los Angles, CA")
    } catch (error) {
        console.error('Error loading test data:', error);
    }
}

module.exports = {
    isUserEmail,
    isNotANumber,
    encryptPassword,
    comparePassword,
    generateUniqueId,
    loadTestData
}
