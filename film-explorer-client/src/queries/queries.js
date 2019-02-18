import { gql } from 'apollo-boost';
// ! 1 query per file
// * keep new movies as base query and extract additonal query into
// * its own file ../queries/<query_name></query_name>
const getNewMovies = gql`
	{
		newMovies {
			id
			poster_path
			title
		}
	}
`;
const discoverMovies = gql`
	query($primary_release_year: Int) {
		discovery(primary_release_year: $primary_release_year) {
			id
			popularity
			title
			vote_average
			vote_count
			poster_path
			release_date
		}
	}
`;

const searchForMovies = gql`
	query($query: String) {
		searchMovie(query: $query) {
			id
			original_title
			popularity
			overview
			release_date
			poster_path
		}
	}
`;

const getMovieInfo = gql`
	query($id: ID) {
		movieInfo(id: $id) {
			title
			overview
			poster_path
			backdrop_path
			genres
			release_date
			vote_average
			runtime
			production_companies
			videos {
				id
				key
			}
			movieReviews {
				id
				content
				author
			}
			movieCredits {
				id
				character
				name
				profile_path
				order
			}
		}
	}
`;
export { getNewMovies, getMovieInfo, searchForMovies, discoverMovies };
