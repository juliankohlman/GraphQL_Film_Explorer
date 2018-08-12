import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { query } from '../queries/queries';

class NewMovies extends Component {
	Movies() {
		console.log(this.props);

		return this.props.data.newMovies.map(movie => {
			return (
				<article key={movie.id} className="movie_list">
					<Link to={'/info/' + movie.id}>
						<img src={movie.poster_path} alt="poster" />
					</Link>
					<h1>{movie.title}</h1>
				</article>
			);
		});
	}
	render() {
		if (this.props.data.loading) return <div>loading movies...</div>;
		return this.Movies();
		// return <div>Something</div>;
	}
}

export default graphql(query)(NewMovies);
