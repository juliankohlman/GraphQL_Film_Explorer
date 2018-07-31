const graphql = require('graphql');
const axios = require('axios');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList,
	GraphQLID
} = graphql;

// now_playing
const NewMoviesType = new GraphQLObjectType({
	name: 'NewMovies',
	fields: {
		id: { type: GraphQLID },
		poster_path: { type: GraphQLString },
		title: { type: GraphQLString }
	}
});

// trailers
const VideoType = new GraphQLObjectType({
	name: 'Video',
	fields: {
		id: { type: GraphQLID },
		key: { type: GraphQLString }
	}
});

// movie search
const MovieSearchType = new GraphQLObjectType({
	name: 'SearchMovie',
	fields: {
		query: { type: GraphQLString },
		year: { type: GraphQLInt }
	}
});

// single movie
const MovieInfoType = new GraphQLObjectType({
	name: 'MovieInfo',
	fields: {
		id: { type: GraphQLID },
		overview: { type: GraphQLString },
		title: { type: GraphQLString },
		poster_path: { type: GraphQLString },
		genres: { type: GraphQLString },
		release_date: { type: GraphQLString },
		vote_average: { type: GraphQLString },
		production_companies: { type: GraphQLString },
		runtime: { type: GraphQLString },
		videos: {
			type: new GraphQLList(VideoType),
			args: { id: { type: GraphQLString } },
			resolve(parentVal, args) {
				return axios
					.get(
						`https://api.themoviedb.org/3/movie/${
							parentValue.id
						}/videos?api_key=${process.env.API}&language=en-US`
					)
					.then(res => res.data.results);
			}
		}
	}
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		movieInfo: {
			type: MovieInfoType,
			args: { id: { type: GraphQLID } },
			resolve(parentVal, args) {
				return axios
					.get(
						`https://api.themoviedb.org/3/movie/${args.id}?api_key=${
							process.env.API
						}&language=en-US&page=1`
					)
					.then(res => {
						const movie = res.data;
						movie.genres = movie.genres.map(g => g.name).join(', ');
						movie.production_companies = movie.production_companies
							.map(c => c.name)
							.join(', ');
						// could leave the time interpretation for the front-end
						movie.runtime += ' minutes.';
						return movie;
					});
			}
		},
		newMovies: {
			type: new GraphQLList(NewMoviesType),
			resolve() {
				return axios
					.get(
						`https://api.themoviedb.org/3/movie/now_playing?api_key=${
							process.env.API
						}&language=en-US&page=1`
					)
					.then(res => {
						const movies = res.data.results;
						movies.map(
							movie =>
								(movie.poster_path = `https://image.tmdb.org/t/p/w500${
									movie.poster_path
								}`)
						);
						return movies;
					});
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
