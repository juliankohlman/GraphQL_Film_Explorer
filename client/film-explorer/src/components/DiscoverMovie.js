import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { Link } from 'react-router-dom';
import { discoverMovies } from '../queries/queries';

class DiscoverMovies extends Component {
	state = {
		results: [],
		primary_release_year: ''
	};

	render() {
		return (
			<div>
				<div>
					Search
					<input
						type="text"
						onChange={e =>
							this.setState({ primary_release_year: e.target.value })
						}
					/>
					<button onClick={() => this.runSearch()}>OK</button>
					{this.state.results.map(movie => (
						<article key={movie.id} className="movie_list">
							<Link to={'/info/' + movie.id}>
								<img src={movie.poster_path} alt="poster" />
							</Link>
							<h1>{movie.original_title}</h1>
						</article>
					))}
				</div>
			</div>
		);
	}

	runSearch = async () => {
		const { primary_release_year } = this.state;
		const result = await this.props.client.query({
			query: discoverMovies,
			variables: { primary_release_year }
		});
		const results = result.data.discovery;
		console.log(results);

		this.setState({ results });
	};
}

export default withApollo(DiscoverMovies);
