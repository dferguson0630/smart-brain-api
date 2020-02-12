const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '535456f5d083408685b311056061930e'
});


const handleApiCall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => res.json(data)).catch(err => res.status(400).json('unable to work with API'))

}


//Function to call the id stored in the database, increment the number of submissions(entries) for that user by one, and return the number of entries
const handleImage = (req, res) => {
	const { id } = req.body;
	db('users').where('id', '=', id).increment('entries',1)
		.returning('entries').then(entries => res.json(entries[0]))
		.catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};