import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { searchForMovies } from '../queries/queries';

class MovieSearch extends Component {
	state = {
		results: [],
		query: ''
	};

	render() {
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
						<li key={movie.id}>{movie.original_title}</li>
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
