# Function Documentation

## Helper Functions

### Function Name: `query`
#### Description
Creates a connection to the database and performs a query.
#### Parameters
- `text` (`string`): The SQL query string to be executed. This should be a valid SQL command.
- `params` (`Array`, `optional`): An array of parameters to be passed with the SQL query. These parameters are used for parameterized queries to prevent SQL injection. This parameter is optional; if not provided, the query will be executed without parameters.
#### Returns
- `Object`: Returns the result of the SQL query execution. The structure of this object will depend on the query and the structure of the data in the database. Typically, it contains a rows property that holds the result set in an array format.
#### Raises
- `Error`: This function will throw an error if there's an issue connecting to the database, executing the query, or releasing the connection back to the pool. The error will contain details about what went wrong.
#### Examples
1. Without any params
```javascript
const getJobTable = async () => {
    const queryText = 'SELECT * FROM jobs';
    return await query(queryText, [])
}
```
2. With Params
```javascript
const getJobsByCompanyId = async (companyId) => {
    const queryText = 'SELECT * FROM jobs WHERE company_id = $1'
    return await query(queryText, [companyId]);
}
```

## User

### Function Name: `findUserByEmail`
#### Description
The `findUserByEmail` function asynchronously searches for a user in a PostgreSQL database by their email address. It utilizes a pre-defined query to retrieve the user's information from the `users` table. If a user with the specified email exists, their data is returned; otherwise, `undefined` is returned, indicating no matching user was found.
#### Parameters
- `email` (`String`): The email address of the user to search for. This should be a valid email address corresponding to a user in the `users` table.
#### Returns
- `Object` or `undefined`: If a user with the provided email address exists, an object containing the user's data is returned. If no user is found, the function returns `undefined`.
#### Raises
- There are no specific exceptions raised by this function itself, but it relies on the `query` function, which may throw an error if there's an issue with the database connection or query execution.
#### Examples
Using the `findUserByEmail` function to find a user by email:
```javascript
const user = await findUserByEmail("john@example.com")
```

### Function Name: `updateUserPassword`
#### Description
The `updateUserPassword` function is designed to update the password of an existing user in a PostgreSQL database, identified by their email address. It performs this operation asynchronously, using a pre-defined SQL update query. The function assumes that a user matching the provided email exists in the `users` table.
#### Parameters
- `email` (`String`): The email address of the user whose password needs to be updated. This should correspond to an existing user in the database.
- `newPassword` (`String`): The new password that will replace the user's current password. This should adhere to any password policies or security standards in place.
#### Returns
- This function does not explicitly return a value. It performs the update operation and completes without returning any data.
#### Raises
- The function itself does not include explicit error handling. However, errors may be thrown by the underlying `query` function used for database interaction, particularly if there are issues with the database connection, query execution, or if the email does not match any user in the database.
#### Examples
Updating a user's password:
```javascript
await updateUserPassword("john@example.com", "password123")
```

## Job

### Function Name: `createNewJob`
#### Description
The `createNewJob` function is designed to insert a new job listing into a PostgreSQL database. It takes details about the job, including company ID, title, description, and location, and adds a new record to the `jobs` table. The function operates asynchronously, ensuring that database interactions do not block other operations.
#### Parameters
- `company_id` (`String` or `Number`): The unique identifier of the company posting the job. This should correspond to a valid company in a related company table.
- `title` (`String`): The title of the job being created. This should succinctly describe the role.
- `description` (`String`): A detailed description of the job, including responsibilities, qualifications, and other relevant information.
- `location` (`String`): The geographical location or office where the job is based.
#### Returns
- This function does not return a value. It performs the insert operation into the database and completes without returning data.
#### Raises
- The function relies on the `query` function for database interaction. Errors might be thrown if there are issues with the database connection, query execution, or if provided data violates database constraints (e.g., data type mismatches, missing required fields).
#### Examples
Creating a new job listing:
```javascript
await createNewJob(1, 'Web Developer', 'Develops the Web', 'Seatle')
```

### Function Name: `getJobTable`
#### Description
The `getJobTable` function retrieves all records from the `jobs` table in a PostgreSQL database. It executes an asynchronous query to select all columns of every row in the `jobs` table. The function is particularly useful for applications needing to display or process a list of all available job listings stored in the database.
#### Parameters
- This function does not take any parameters.
#### Returns
- `Array`: Returns an array of objects, where each object represents a row in the `jobs` table. Each object contains the details of a job, such as job ID, company ID, title, description, and location.
#### Raises
- The function depends on the `query` function for executing the SQL command. It may throw errors related to database connectivity or query execution. Common errors include connection failures or syntax errors in the SQL command.
#### Examples
Retrieving the entire jobs table:
```javascript
const allJobs = await getJobTable()
```

### Function Name: `getJobsByCompanyId`
#### Description
The `getJobsByCompanyId` function asynchronously fetches all job listings associated with a specific company from the `jobs` table in a PostgreSQL database. It queries the database for all jobs where the `company_id` matches the provided ID. This function is useful for filtering job listings to display only those related to a particular company.
#### Parameters
- `companyId` (`String` or `Number`): The unique identifier of the company whose job listings are to be retrieved. This ID should correspond to the `company_id` field in the `jobs` table.
#### Returns
- `Object`: Returns an object containing the result of the query. Typically, this object includes a `rows` property, which is an array of job records where each record is an object representing a job listing associated with the given `companyId`.
#### Raises
- Relies on the `query` function for database interaction and may throw errors if there are issues with the database connection or query execution. Common errors could arise from invalid `companyId` values or connection issues.
#### Examples
Fetching job listings for a specific company:
```javascript
const companyJobList = await getJobsByCompanyId(1)
```


## Job Map

### Function Name: `getJobsByCompanyId`
#### Description
The `getJobMapTable` function is an asynchronous operation designed to retrieve all records from the `job_map` table in a PostgreSQL database. This function executes a simple SQL query that selects all columns from the `job_map` table. The primary use case for this function is to obtain a complete listing of job mappings, which can be useful in scenarios where a comprehensive overview of job-related data is needed.
#### Returns
- `Object`: The function returns an object containing the result of the database query. This typically includes a `rows` property, which is an array of records from the `job_map` table. Each record within this array is an object representing a single row from the table.
#### Raises
- This function depends on the `query` function for interacting with the database. It may throw errors related to the database connection or query execution. Possible errors include issues with executing the SQL query or problems establishing a connection to the database.
#### Examples
To fetch all records from the `job_map` table:
```javascript
const jobMapData = await getJobMapTable();
```

## Company

### Function Name: `getCompanyTable`
#### Description
The `getCompanyTable` function is an asynchronous operation used to retrieve all records from the `companies` table in a PostgreSQL database. This function performs a SQL query to select all columns from the `companies` table. It's typically used for obtaining a complete list of company records, which can be essential for various business or data analysis purposes.
#### Returns
- `Array`: Returns an array of objects, each representing a row from the `companies` table. This array is extracted from the `rows` property of the object returned by the `query` function.
#### Raises
- The function relies on the `query` function to interact with the database and may throw errors if there are issues with the database connection or query execution. Common errors could include problems with the SQL query or difficulties in connecting to the database.
#### Examples
Retrieving all records from the `companies` table:
```javascript
const companiesData = await getCompanyTable();
```

## Influencer

### Function Name: `getInfluencerTable`
#### Description
The `getInfluencerTable` function is an asynchronous operation intended to fetch all records from the `influencers` table in a PostgreSQL database. This function performs a SQL query that selects all columns from the `influencers` table. It is primarily used to retrieve a comprehensive list of influencers, which is valuable for marketing, analysis, or social media management purposes.
#### Returns
- `Object`: The function returns an object containing the result of the database query. This object usually includes a `rows` property, which holds an array of records from the `influencers` table. Each element in this array is an object representing a single influencer record.
#### Raises
- The function depends on the `query` function for database interaction. It might throw errors related to the database connection or the execution of the query. Possible issues include problems with the SQL query or challenges in establishing a database connection.
#### Examples
To retrieve all records from the `influencers` table:
```javascript
const influencerData = await getInfluencerTable();
```

## Notification

### Function Name: `getNotificationTable`
#### Description
The `getNotificationTable` function is an asynchronous operation designed to retrieve all records from the `notifications` table in a PostgreSQL database. By executing a SQL query, it selects all columns from the `notifications` table. This function is typically used for accessing a full list of notifications, which can be crucial for system monitoring, user communication, or administrative tasks.
#### Returns
- `Object`: Returns an object containing the result of the database query. This object generally features a `rows` property, which is an array of the records in the `notifications` table. Each record in this array is an object representing an individual notification entry.
#### Raises
- This function relies on the `query` function for database interactions and may throw errors if there are issues with the database connection or the execution of the query. These issues can range from problems with the SQL query itself to difficulties in establishing a connection to the database.
#### Examples
Fetching all records from the `notifications` table:
```javascript
const notificationData = await getNotificationTable();
```


### Function Name: `createNewNotification`
#### Description
The `createNewNotification` function is an asynchronous operation used to insert a new notification record into the `notifications` table in a PostgreSQL database. This function executes an SQL `INSERT` query, adding a record with specified `company_id`, `influencer_id`, `job_id`, and `message`. It is ideally used for creating new notifications in the system, such as alerts, updates, or other communication relevant to specific companies, influencers, and job postings.
#### Parameters
- `company_id` (`Number`): The unique identifier of the company related to the notification.
- `influencer_id` (`Number`): The unique identifier of the influencer related to the notification.
- `job_id` (`Number`): The unique identifier of the job related to the notification.
- `message` (`String`): The content of the notification message.
#### Returns
- `Object`: Returns an object containing the result of the `INSERT` query. This object typically reflects the outcome of the operation, such as a success message or details of the inserted record.
#### Raises
- The function is dependent on the `query` function for database interaction and may throw errors if issues arise with the database connection or the execution of the query. Possible errors can include issues with the provided parameters or problems with the database connection.
#### Examples
Creating a new notification:
```javascript
const newNotification = await createNewNotification(1, 2, 3, 'New job assignment available');
```


