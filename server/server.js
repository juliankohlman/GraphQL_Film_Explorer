const express = require('express');
const dotenv = require('dotenv');

const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
dotenv.config();
const app = express();

app.use(
	'/graphql',
	expressGraphQL({
		schema,
		graphiql: true
	})
);

app.listen(4000, () => {
	console.log('Listening...');
});
