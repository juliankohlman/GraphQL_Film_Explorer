// const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema.js');

// const publicPath = path.join(__dirname, '..', 'public');
const port_number = process.env.PORT || 4000;
dotenv.config();

// app.use(express.static(publicPath));

// app.get('*', (req, res) => {
// 	res.sendfile(path.join(publicPath, 'index.html'));
// });

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
