# Function Documentation: `userController.js`

## Functions:

### Function Name: `checkEmailFormat`

#### Description
The `checkEmailFormat` function is a synchronous operation that validates the format of a given email address. It uses a regular expression to check if the email conforms to a standard pattern (e.g., `user@example.com`). The function throws an error if the provided email does not match the expected format. This validation is crucial in processes where a valid email address is required, such as user registration, authentication, or communication purposes.

#### Parameters
- `email` (`String`): The email address to be validated.

#### Raises
- `Error`: Throws an error with the message 'Invalid Email.' if the email does not match the standard email format.

#### Examples
```javascript
checkEmailFormat('user@example.com'); // No error for valid email
checkEmailFormat('userexample.com'); // Throws 'Invalid Email.'
```



### Function Name: `checkEmailEmpty`

#### Description
The `checkEmailEmpty` function is a synchronous operation that checks whether an email address has been provided. It throws an error if the `email` parameter is null, undefined, or an empty string, ensuring that the email address is not omitted in processes where it is a mandatory field.

#### Parameters
- `email` (`String`): The email address to be checked for its presence.

#### Raises
- `Error`: Throws an error with the message 'Email is required.' if the email parameter is missing or empty.

#### Examples
```javascript
checkEmailEmpty('user@example.com'); // No error for a provided email
checkEmailEmpty(''); // Throws 'Email is required.'
checkEmailEmpty(null); // Throws 'Email is required.'
```



### Function Name: `checkPasswordEmpty`

#### Description
The `checkPasswordEmpty` function is a synchronous operation designed to verify if a password has been provided. It checks whether the `password` parameter is null, undefined, or an empty string. If any of these conditions are true, the function throws an error. This check is essential in scenarios where a password is a mandatory field, such as user authentication or account registration processes.

#### Parameters
- `password` (`String`): The password to be validated for its presence.

#### Raises
- `Error`: Throws an error with the message 'Password is required.' if the password parameter is missing or empty.

#### Examples
```javascript
checkPasswordEmpty('mySecurePassword'); // No error for a provided password
checkPasswordEmpty(''); // Throws 'Password is required.'
checkPasswordEmpty(null); // Throws 'Password is required.'
```



### Function Name: `checkLoginFieldsEmpty`

#### Description
The `checkLoginFieldsEmpty` function is a synchronous operation that verifies whether both email and password fields are provided for a login process. It checks for the presence of both `email` and `password` parameters. If either or both are missing, it throws an error. The function uses `checkEmailEmpty` and `checkPasswordEmpty` to perform individual field checks, providing specific error messages.

#### Parameters
- `email` (`String`): The email address to be validated for its presence.
- `password` (`String`): The password to be validated for its presence.

#### Raises
- `Error`: Throws an error with the message 'Email and password are required.' if both email and password are missing.
- `Error`: Delegates to `checkEmailEmpty` or `checkPasswordEmpty` to throw an error if either email or password is missing.

#### Examples
```javascript
checkLoginFieldsEmpty('user@example.com', 'myPassword'); // No error for provided email and password
checkLoginFieldsEmpty('', ''); // Throws 'Email and password are required.'
checkLoginFieldsEmpty('user@example.com', ''); // Throws 'Password is required.' from checkPasswordEmpty
checkLoginFieldsEmpty('', 'myPassword'); // Throws 'Email is required.' from checkEmailEmpty
```



### Function Name: `checkPasswordLength`

#### Description
The `checkPasswordLength` function is a synchronous operation that validates the length of a provided password. It ensures that the password meets a minimum length requirement, currently set to 8 characters. This function is critical for enforcing password strength policies in user authentication or account creation processes. A comment in the function indicates a plan to also implement a maximum password length check in the future.

#### Parameters
- `password` (`String`): The password to be checked for length.

#### Raises
- `Error`: Throws an error with the message 'Password too short.' if the password is shorter than the minimum required length.

#### Examples
```javascript
checkPasswordLength('securePass'); // No error for password meeting minimum length
checkPasswordLength('short'); // Throws 'Password too short.'
```



### Function Name: `verifyUserExists`

#### Description
The `verifyUserExists` function is an asynchronous operation that checks whether a user with a given email address exists in the database. It utilizes the `model.findUserByEmail` method to search for the user. If the user is not found, the function throws an error, indicating that the user does not exist. This function is essential for operations that require a user's existence in the system, such as login authentication, password reset, or user-specific queries.

#### Parameters
- `email` (`String`): The email address of the user to be verified.

#### Returns
- `Object`: Returns the user object if found in the database.

#### Raises
- `Error`: Throws an error with the message 'User does not exist.' if no user is found corresponding to the provided email address.

#### Examples
```javascript
const user = await verifyUserExists('user@example.com');
// Returns the user object if it exists, otherwise throws an error
```



### Function Name: `authenticateUserByPassword`

#### Description
The `authenticateUserByPassword` function is an asynchronous operation designed to authenticate a user by verifying their email and password. It first checks if the user exists in the database using the `verifyUserExists` function. Then, it compares the provided password with the user's stored password. In a real-world scenario, this comparison would be between the provided password and a hashed password stored in the database (as noted in the `// todo` comment). The function throws an error if the password does not match, ensuring secure access control.

#### Parameters
- `email` (`String`): The email address of the user attempting to authenticate.
- `password` (`String`): The password provided by the user for authentication.

#### Returns
- `Object`: Returns the user object if the email and password combination is correct.

#### Raises
- `Error`: Throws an error with the message 'Incorrect Password.' if the provided password does not match the user's stored password.

#### Examples
```javascript
const user = await authenticateUserByPassword('user@example.com', 'correctPassword');
// Returns user object if the password is correct, otherwise throws an error
```



### Function Name: `performLogin`

#### Description
The `performLogin` function is an asynchronous operation that orchestrates the process of user login. It involves several validation steps: checking if the login fields (email and password) are not empty, validating the email format, and ensuring the password length meets the requirements. After these validations, it attempts to authenticate the user by calling `authenticateUserByPassword`. This function streamlines the login process, ensuring that all necessary checks are performed before granting access.

#### Parameters
- `email` (`String`): The email address of the user attempting to log in.
- `password` (`String`): The password provided by the user for login.

#### Returns
- `Object`: Returns the authenticated user object if all validations pass and the user is successfully authenticated.

#### Raises
- The function will throw errors during validation if the email or password fields are empty, the email format is incorrect, or the password length is insufficient.
- Additional errors can be thrown from `authenticateUserByPassword` if the user does not exist or if the password is incorrect.

#### Examples
```javascript
const user = await performLogin('user@example.com', 'validPassword');
// Returns the authenticated user object if all validations and authentication pass
```



### Function Name: `handleLoginError`

#### Description
The `handleLoginError` function is designed to handle and categorize errors that occur during the login process. It maps specific error messages to HTTP status codes and custom error messages, which are helpful for providing detailed feedback in a web service or user interface context. This function enhances error reporting by distinguishing between various types of login-related errors.

#### Parameters
- `error` (`Error`): The error object thrown during the login process.

#### Returns
- `Object`: An object containing a structured `errorMessage` and a corresponding `statusCode`. The `errorMessage` is a collection of key-value pairs indicating specific error messages for different fields (like `emailError` and `passwordError`).

#### Logic
- The function uses a `switch` statement to match the `error.message` to predefined cases. Depending on the case, it assigns appropriate error messages to `errorMessage` and sets the `statusCode`.

#### Error Handling Cases
- **Email and Password Required**: Sets both `emailError` and `passwordError` with respective messages and a 400 status code.
- **Email Required**: Sets `emailError` and a 400 status code.
- **Password Required**: Sets `passwordError` and a 400 status code.
- **Invalid Email**: Sets `emailError` and a 400 status code.
- **Password Too Short**: Sets a custom message for `passwordError` and a 400 status code.
- **User Does Not Exist**: Sets `emailError` and a 401 status code.
- **Incorrect Password**: Sets `passwordError` and a 401 status code.
- **Default Case**: Logs the error and sets a general error message and a 500 status code.

#### Examples
```javascript
const errorResult = handleLoginError(new Error('Email is required.'));
// Returns: { errorMessage: { emailError: 'Email is required.' }, statusCode: 400 }
```