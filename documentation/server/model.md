# Function Documentation: `model.js`

## Functions:

---

### Function Name: `createNewJob`

#### Description
The `createNewJob` function is an asynchronous operation that adds a new job posting to the database. It calls `db.createNewJob` to perform the insertion, using provided details such as the company ID, job title, description, and location. This function is essential for managing and updating job listings within a company's database.

#### Parameters
- `company_id` (`Number`): The ID of the company posting the job.
- `title` (`String`): The title of the job.
- `description` (`String`): A detailed description of the job, including duties and requirements.
- `location` (`String`): The location where the job is based.

#### Returns
- `Object`: An object containing the result of the job creation operation, potentially including the new job's ID and other relevant data.

#### Raises
- Errors related to database operations can occur, particularly if there are issues with the parameters provided or the database connection.

#### Examples
```javascript
const newJob = await createNewJob(101, 'Front-End Developer', 'Developing user-facing features for web applications', 'San Francisco, CA');
```

---

### Function Name: `createNewNotification`

#### Description
The `createNewNotification` function is an asynchronous operation that facilitates the creation of new notifications in a database. It utilizes the `db.createNewNotification` method to insert a notification record, requiring details such as company ID, influencer ID, job ID, and a message. This function is typically used for generating notifications related to job postings, company updates, or influencer activities.

#### Parameters
- `company_id` (`Number`): The identifier of the company associated with the notification.
- `influencer_id` (`Number`): The identifier of the influencer associated with the notification.
- `job_id` (`Number`): The identifier of the job associated with the notification.
- `message` (`String`): The content of the notification message.

#### Returns
- `Object`: An object representing the outcome of the notification creation process, which may include details such as the notification ID or a confirmation message.

#### Raises
- Potential errors can arise from database interactions, such as connectivity issues, problems with the input parameters, or issues within the `db.createNewNotification` method itself.

#### Examples
```javascript
const notification = await createNewNotification(200, 15, 5, 'New application received for your job posting');
```

---

### Function Name: `createNewUser`

#### Description
The `createNewUser` function is an asynchronous operation that facilitates the creation of a new user record in the database. It delegates to the `db.createNewUser` method, passing parameters such as a unique identifier (`id`), email, password, and account type. This function is instrumental in user registration processes, where it is necessary to store new user information securely in the database.

#### Parameters
- `id` (`uuid`): A unique identifier for the new user.
- `email` (`String`): The email address of the new user.
- `password` (`String`): The password for the new user. In a production environment, this would usually be a hashed password.
- `accountType` (`String`): The type of account being created (e.g., 'influencer', 'company').

#### Returns
- The function returns the result of the `db.createNewUser` operation, which is typically an object containing details of the newly created user record, such as a confirmation message, user ID, or other relevant information.

#### Examples
```javascript
const newUser = await createNewUser('123e4567-e89b-12d3-a456-426614174000', 'user@example.com', 'securePassword', 'influencer');
// Creates a new user with the given details and returns the user information
```

---

### Function Name: `createNewInfluencer`

#### Description
The `createNewInfluencer` function is an asynchronous operation designed to add a new influencer record to the database. It calls the `db.createNewInfluencer` method, passing along the influencer's unique identifier, name, and email. This function plays a key role in influencer management systems, allowing for the registration and tracking of influencers in various marketing or social media campaigns.

#### Parameters
- `id` (`uuid`): The unique identifier for the influencer.
- `name` (`String`): The name of the influencer.
- `email` (`String`): The email address associated with the influencer.

#### Returns
- The function returns the outcome of the `db.createNewInfluencer` method, typically an object containing details about the newly added influencer, such as their ID, name, or confirmation of the operation.

#### Examples
```javascript
const newInfluencer = await createNewInfluencer('123e4567-e89b-12d3-a456-426614174000', 'Jane Doe', 'jane.doe@example.com');
// Adds a new influencer to the database and returns the influencer's information
```

---

### Function Name: `createNewCompany`

#### Description
The `createNewCompany` function is an asynchronous operation that facilitates the addition of a new company record into the database. It invokes the `db.createNewCompany` method, providing essential details such as the company's unique identifier, name, email, and address. This function is integral to systems managing company profiles, enabling the registration and maintenance of company-related information in a structured database.

#### Parameters
- `id` (`uuid`): A unique identifier for the company.
- `companyName` (`String`): The name of the company.
- `email` (`String`): The email address associated with the company.
- `address` (`String`): The physical address of the company.

#### Returns
- The function returns the result of the `db.createNewCompany` operation, which usually includes details of the newly created company record, such as a confirmation message or the company's ID.

#### Examples
```javascript
const newCompany = await createNewCompany('123e4567-e89b-12d3-a456-426614174000', 'Acme Corp', 'contact@acmecorp.com', '123 Business St.');
// Creates a new company record in the database and returns the company's details
```

---

### Function Name: `findUserByEmail`

#### Description
The `findUserByEmail` function is an asynchronous operation designed to retrieve user data from a database based on an email address. It calls the `db.findUserByEmail` method, passing the provided email as a parameter. This function is primarily used for user lookup operations, such as authentication, profile retrieval, or data verification processes.

#### Parameters
- `email` (`String`): The email address of the user to be searched in the database.

#### Returns
- `Object`: An object containing the user data retrieved from the database. If no user is found with the given email, the function may return `null` or an empty object.

#### Raises
- Errors can occur due to database connectivity issues, invalid email formats, or if the `db.findUserByEmail` method encounters any internal issues.

#### Examples
```javascript
const user = await findUserByEmail('example@email.com');
```

---

### Function Name: `getAllJobs`

#### Description
The `getAllJobs` function is an asynchronous operation that retrieves all job records from the database. It utilizes the `db.getJobTable` method to fetch the entire job listings table. This function is typically used to display all available job postings, gather statistical data, or perform administrative tasks that require an overview of all jobs in the system.

#### Parameters
- None

#### Returns
- `Array`: An array of job objects, each representing a job record from the database. If there are no jobs available, it may return an empty array.

#### Raises
- Potential errors include issues related to database connectivity or failures within the `db.getJobTable` method.

#### Examples
```javascript
const jobs = await getAllJobs();
```

---

### Function Name: `getAllCompanies`

#### Description
The `getAllCompanies` function is an asynchronous operation designed to retrieve a complete list of companies from the database. It calls the `db.getCompanyTable` method to obtain all records from the company table. This function is useful for generating comprehensive lists of companies, for purposes such as data analysis, reporting, or displaying a directory of companies.

#### Parameters
- None

#### Returns
- `Array`: Returns an array of company objects, each representing a company record in the database. If no companies are found, it returns an empty array.

#### Raises
- Errors could arise from issues like database connectivity problems or internal errors within the `db.getCompanyTable` method.

#### Examples
```javascript
const companies = await getAllCompanies();
```

---

### Function Name: `getAllInfluencers`

#### Description
The `getAllInfluencers` function is an asynchronous operation aimed at fetching all influencer records from the database. It utilizes the `db.getInfluencerTable` method to access the influencer table and then returns the `rows` property of the response, which contains the actual influencer data. This function is commonly used for operations requiring a full list of influencers, such as generating reports, creating marketing strategies, or managing influencer-related data in the system.

#### Parameters
- None

#### Returns
- `Array`: An array containing influencer objects, each object representing a row from the influencer table in the database. If there are no influencers in the table, it will return an empty array.

#### Raises
- Possible errors can include issues with the database connection or the execution of the `db.getInfluencerTable` method, leading to failure in retrieving the data.

#### Examples
```javascript
const influencers = await getAllInfluencers();
```

---

### Function Name: `getJobsByCompanyId`

#### Description
The `getJobsByCompanyId` function is an asynchronous operation designed to retrieve all job postings associated with a specific company from the database. It calls the `db.getJobsByCompany` method with a `companyId` parameter. The function then extracts and returns the `rows` property from the response, which contains the job data. This function is particularly useful for fetching job listings related to a single company, aiding in company-specific job management, and displaying targeted job postings.

#### Parameters
- `companyId` (`Number`): The unique identifier of the company whose job postings are to be retrieved.

#### Returns
- `Array`: Returns an array of job objects, each representing a job record associated with the given company ID. If the company has no job postings, it returns an empty array.

#### Raises
- Potential errors can arise from the database connectivity issues, incorrect company ID formatting, or internal errors within the `db.getJobsByCompany` method.

#### Examples
```javascript
const jobs = await getJobsByCompanyId(123);
```

---

### Function Name: `getCompanyById`

#### Description
The `getCompanyById` function is an asynchronous operation used to retrieve The specific company based on the id that's passed in.

#### Parameters
- `companyId` (`Number`): The unique identifier of the company

#### Returns
- `Object`: Returns an object representing the data for the company, This is pulled from the 'companies' table based on the id.

#### Raises
- The function relies on the `query` function to interact with the database and may throw errors if there are issues with the database connection or query execution. Common errors could include problems with the SQL query or difficulties in connecting to the database.

#### Examples
Retrieving company object from the `companies` table:
```javascript
const companiesData = await getCompanyById(companyId);
```

---

### Function Name: `getInfluencerById`

#### Parameters
- `influencerId` (`Number`): The unique identifier of the Influencer.

#### Description
The `getInfluencerById` function is an asynchronous operation used to retrieve The specific Influencer based on the id that's passed in.

#### Returns
- `Object`: Returns an object representing the data for the Influencer, This is pulled from the `influencers` table based on the id.

#### Raises
- The function relies on the `query` function to interact with the database and may throw errors if there are issues with the database connection or query execution. Common errors could include problems with the SQL query or difficulties in connecting to the database.

#### Examples
Retrieving company object from the `influencers` table:
```javascript
const influencer = await getInfluencerById(1);
```

---

### Function Name: `resetUserPassword`

#### Description
The `resetUserPassword` function is an asynchronous operation that updates a user's password in the database. It leverages the `db.updateUserPassword` method, taking an email address and a new password as parameters. This function is primarily used for password reset processes, allowing users to update their passwords securely.

#### Parameters
- `email` (`String`): The email address of the user whose password is being reset.
- `newPassword` (`String`): The new password to be set for the user.

#### Returns
- `Object`: An object indicating the result of the password update operation. It may include confirmation of the update or details of the affected record.

#### Raises
- Possible errors include database connection issues, invalid email format, or errors within the `db.updateUserPassword` method.

#### Examples
```javascript
const resetResult = await resetUserPassword('user@example.com', 'newSecurePassword123');
```

---
