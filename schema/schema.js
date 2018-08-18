const graphql = require('graphql');
const axios = require('axios');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList,
	GraphQLID,
	GraphQLFloat
} = graphql;

// movie search by title
// * Search type can be an entry way.
// * User enters a search query on front end
// * gets presented with the search results (title, release_year)
// * selects movie which will trigger route to movie info type via the id BOOM
// discover
// implement schema for 80's movie discovery
// thne implement the query in queries.js for testing

// * https://developers.themoviedb.org/3/discover/movie-discover
const MovieSearchType = new GraphQLObjectType({
	name: 'Search',
	fields: () => ({
		query: { type: GraphQLString },
		id: { type: GraphQLID },
		popularity: { type: GraphQLFloat },
		original_title: { type: GraphQLString },
		vote_count: { type: GraphQLInt },
		vote_average: { type: GraphQLFloat },
		poster_path: { type: GraphQLString },
		overview: { type: GraphQLString },
		release_date: { type: GraphQLString }
	})
});

// now_playing
const NewMoviesType = new GraphQLObjectType({
	name: 'NewMovies',
	fields: {
		id: { type: GraphQLID },
		poster_path: { type: GraphQLString },
		title: { type: GraphQLString },
		overview: { type: GraphQLString }
	}
});

// single movie by id
const MovieInfoType = new GraphQLObjectType({
	name: 'MovieInfo',
	fields: () => ({
		id: { type: GraphQLID },
		overview: { type: GraphQLString },
		title: { type: GraphQLString },
		poster_path: { type: GraphQLString },
		genres: { type: GraphQLString },
		release_date: { type: GraphQLString },
		vote_average: { type: GraphQLFloat },
		production_companies: { type: GraphQLString },
		runtime: { type: GraphQLString },
		movieReviews: {
			type: new GraphQLList(MovieReviewsType),
			args: { id: { type: GraphQLID } },
			resolve(parentValue, args) {
				return axios
					.get(
						`https://api.themoviedb.org/3/movie/${
							parentValue.id
						}/reviews?api_key=${process.env.API}&language=en-US&page=1`
					)
					.then(res => res.data.results);
			}
		},
		movieCredits: {
			type: new GraphQLList(MovieCreditsType),
			args: { id: { type: GraphQLID } },
			resolve(parentValue, args) {
				return axios
					.get(
						`https://api.themoviedb.org/3/movie/${
							parentValue.id
						}/credits?api_key=${process.env.API}`
					)
					.then(res => res.data.cast.filter(cast => cast.profile_path));
			}
		},
		videos: {
			type: new GraphQLList(VideoType),
			args: { id: { type: GraphQLID } },
			resolve(parentValue, args) {
				return axios
					.get(
						`https://api.themoviedb.org/3/movie/${
							parentValue.id
						}/videos?api_key=${process.env.API}&language=en-US`
					)
					.then(res => res.data.results);
			}
		}
	})
});

// trailers
const VideoType = new GraphQLObjectType({
	name: 'Video',
	fields: {
		id: { type: GraphQLID },
		key: { type: GraphQLString }
	}
});

// movie credits
const MovieCreditsType = new GraphQLObjectType({
	name: 'MovieCredits',
	fields: {
		id: { type: GraphQLID },
		character: { type: GraphQLString },
		name: { type: GraphQLString },
		profile_path: { type: GraphQLString },
		order: { type: GraphQLString }
	}
});

// movie reviews
const MovieReviewsType = new GraphQLObjectType({
	name: 'MovieReviews',
	fields: {
		id: { type: GraphQLID },
		content: { type: GraphQLString },
		author: { type: GraphQLString }
	}
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
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
						movies.map(movie => {
							movie.poster_path = `https://image.tmdb.org/t/p/w500${
								movie.poster_path
							}`;
							movie.overview;
						});

						return movies;
					});
			}
		},
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
		searchMovie: {
			type: new GraphQLList(MovieSearchType),
			args: { query: { type: GraphQLString }, id: { type: GraphQLID } },
			resolve(parentVal, args) {
				return axios
					.get(
						`https://api.themoviedb.org/3/search/movie?api_key=${
							process.env.API
						}&language=en-US&query=${args.query}&page=1&include_adult=false`
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
