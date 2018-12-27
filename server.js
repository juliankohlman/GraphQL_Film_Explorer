const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema.js');
dotenv.config();
const app = express();
const port_number = process.env.PORT || 4000;

if (process.env.NODE === 'production') {
	app.use(express.static('client/build'));
}
app.get('*', (req, res) => {
	res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.use(cors());

app.use(
	'/graphql',
	expressGraphQL({
		schema,
		graphiql: true
	})
);

app.listen(port_number, () => {
	console.log(`Listening on port ${port_number}...`);
});
