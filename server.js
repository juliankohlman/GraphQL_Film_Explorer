const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema.js');
dotenv.config();
const app = express();
const port_number = app.listen(process.env.PORT || 4000);

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
