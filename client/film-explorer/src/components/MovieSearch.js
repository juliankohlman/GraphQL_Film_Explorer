import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
// import { withApollo, Query, graphql } from 'react-apollo';
// import { Link } from 'react-router-dom';
// import { searchForMovies } from '../queries/queries';

const searchForMovies = gql`
	query($query: String) {
		searchMovie(query: $query) {
			id
			original_title
			popularity
			overview
			release_date
		}
	}
`;

class MovieSearch extends Component {
	state = {
		results: [],
		query: ''
	};

	render() {
		// const title = this.state.title;
		return (
			<div>
				<div>
					Search
					<input
						type="text"
						onChange={e => this.setState({ query: e.target.value })}
					/>
					<button onClick={() => this.runSearch()}>OK</button>
					{this.state.results.map(movie => (
						<li>{movie.original_title}</li>
					))}
				</div>
			</div>
		);
	}

	runSearch = async () => {
		const { query } = this.state;
		const result = await this.props.client.query({
			query: searchForMovies,
			variables: { query }
		});
		const results = result.data.searchMovie;
		console.log(results);

		this.setState({ results });
	};
}

export default withApollo(MovieSearch);
// export default withApollo(searchForMovies)(MovieSearch);
