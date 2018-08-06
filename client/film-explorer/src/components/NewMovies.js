import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { getNewMovies } from '../queries/queries';

class NewMovies extends Component {
	Movies() {
		return this.props.data.NewMovies.map(movie => {
			return (
				<article key={movie.id} className="movie_list">
					<Link to={'/info/' + movie.id}>
						<img src={movie.poster_path} />
					</Link>
					<h1>{movie.title}</h1>
				</article>
			);
		});
	}
	render() {
		if (this.props.data.loading) return <div>loading movies...</div>;
		return this.Movies();
	}
}

export default graphql(getNewMovies)(NewMovies);
