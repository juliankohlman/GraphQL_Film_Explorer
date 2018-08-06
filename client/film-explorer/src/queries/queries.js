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
export { getNewMovies };
