import React, { Component } from 'react';
import { Query, graphql } from 'react-apollo';
// import { Link } from 'react-router-dom';
import { searchForMovies } from '../queries/queries';

class MovieSearch extends Component {
	state = {
		query: ''
	};

	render() {
		const query = this.state.query;
		return (
			<div>
				<div>
					Search
					<input
						type="text"
						onChange={e => this.setState({ query: e.target.value })}
					/>
					{/* <button onClick={() => this.runSearch()}>OK</button> */}
				</div>
				<Query query={searchForMovies} variables={{ query }}>
					{({ loading, err, data }) => {
						if (loading) return <div>loading</div>;
						if (err) return <p>Error :(</p>;
						console.log(data);

						return (
							<div>
								<p>Search results</p>
							</div>
						);
					}}
				</Query>
			</div>
		);
	}
	// Movies() {
	// 	console.log(this.props.data);
	// 	return this.props.data.MovieSearch.map(movie => {
	// 		return (
	// 			<article key={movie.id} className="movie_list">
	// 				<Link to={'/info/' + movie.id}>
	// 					<img src={movie.poster_path} alt="poster" />
	// 				</Link>
	// 				<h1>{movie.title}</h1>
	// 			</article>
	// 		);
	// 	});
	// }
	// render() {
	// 	if (this.props.data.loading) return <div>loading movies...</div>;
	// 	return this.Movies();
	// }
}

export default graphql(searchForMovies)(MovieSearch);
