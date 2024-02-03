# Function Documentation: `model.js`

## Functions:

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