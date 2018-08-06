import React, { Component } from 'react';
// import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { getNewMovies } from '../queries/queries';

class NewMovies extends Component {
	Movies() {
		console.log(this.props);

		return this.props.data.map(movie => {
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
