# Function Documentation: `util.js`

## Functions:

### Function Name: `isUserEmail`

#### Description
The `isUserEmail` function is an asynchronous operation that checks if a given email address is associated with any user in the database. It utilizes the `model.findUserByEmail` method to search for a user with the specified email. The function then returns a boolean value indicating whether the user exists. This function is useful in scenarios like validating user existence, checking for duplicate emails during registration, or as a preliminary check before initiating processes like password resets.

#### Parameters
- `email` (`String`): The email address to be checked in the database.

#### Returns
- `Boolean`: Returns `true` if a user with the given email exists in the database, `false` otherwise.

#### Examples
```javascript
const exists = await isUserEmail('user@example.com');
// Returns true if the user exists, false if not
```



### Function Name: `isNotANumber`

#### Description
The `isNotANumber` function is a synchronous operation that determines whether a given string represents a non-numeric value. It attempts to parse the string as an integer using a specified radix (base), in this case, decimal (base 10), and then checks if the result is `NaN` (Not-a-Number). This function is useful for validating that input expected to be numeric (like IDs or quantities) is indeed in a proper numerical format.

#### Parameters
- `string` (`String`): The string to be evaluated for its numeric representation.

#### Returns
- `Boolean`: Returns `true` if the string does not represent a numeric value, `false` otherwise.

#### Examples
```javascript
const result1 = isNotANumber('1234'); // Returns false, as '1234' is a valid number
const result2 = isNotANumber('abc');  // Returns true, as 'abc' is not a number
```