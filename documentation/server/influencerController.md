# Function Documentation: `influencerController.js`

## Functions:

### Function Name: `allInfluencers`

#### Description
The `allInfluencers` function is an asynchronous operation that aims to retrieve all influencer records from the model layer, often representing a database. It executes the `model.getAllInfluencers` method, which is responsible for fetching the complete list of influencers. This function is particularly useful for scenarios requiring a full overview of influencers, such as for analytics, marketing strategy development, or database management.

#### Parameters
- None

#### Returns
- `Array`: An array of influencer objects, each representing an individual influencer record. If the database contains no influencer records, the function will return an empty array.

#### Raises
- Potential errors can include issues with the model layer's database connectivity or errors within the `model.getAllInfluencers` method itself.

#### Examples
```javascript
const influencers = await allInfluencers();
```



