# Function Documentation: `notificationController.js`

## Functions:

### Function Name: `createNotification`

#### Description
The `createNotification` function is an asynchronous operation that creates a new notification record in the database. It utilizes the `model.createNewNotification` method, passing parameters such as company ID, influencer ID, job ID, and a message. This function is typically used to generate notifications related to job postings, company updates, or influencer activities, contributing to effective communication and management within the system.

#### Parameters
- `company_id` (`Number`): The identifier of the company associated with the notification.
- `influencer_id` (`Number`): The identifier of the influencer associated with the notification.
- `job_id` (`Number`): The identifier of the job associated with the notification.
- `message` (`String`): The content of the notification message.

#### Returns
- Currently, the function does not return a value. It is advisable to return the result of the notification creation for confirmation or error handling.

#### Raises
- The function currently does not include error handling. Implementing error handling is recommended to manage potential issues like invalid input or database operation failures.

#### Examples
```javascript
await createNotification(1, 2, 3, 'New job posting available');
```