import { gql } from 'apollo-boost';

const getNewMovies = gql`
	{
		newMovies {
			id
			poster_path
			title
		}
	}
`;

const getMovieInfo = gql`
	query($id: ID) {
		movieInfo(id: $id) {
			title
			overview
			poster_path
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
export { getNewMovies, getMovieInfo };
