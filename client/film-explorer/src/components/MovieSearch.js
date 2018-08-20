import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { Link } from 'react-router-dom';
import { searchForMovies } from '../queries/queries';

class MovieSearch extends Component {
	state = {
		results: [],
		query: ''
	};

	render() {
		return (
			<div>
				<a id="home_btn" href="/">
					Home
				</a>
				<div>
					Search
					<input
						type="text"
						placeholder="Movie title..."
						onChange={e => this.setState({ query: e.target.value })}
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
