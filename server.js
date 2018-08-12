const express = require('express');
const dotenv = require('dotenv');
// const cors = require('cors');

const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
dotenv.config();
const app = express();

// app.use(cors());

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
