const graphql = require('graphql');
const axios = require('axios');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;

const NewMoviesType = new GraphQLObjectType({
	name: 'NewMovies',
	fields: {
		id: { type: GraphQLInt },
		poster_path: { type: GraphQLString },
		title: { type: GraphQLString }
	}
});

const RootQuery = new GraphQLObjectType({});
