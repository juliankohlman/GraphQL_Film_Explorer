import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { getNewMovies } from '../queries/queries';

class NewMovies extends Component {
	// extrapolate Movies() out of this component
	// this can be passed to all other components
	// that return search results...Discover,Search etc..
	Movies() {
		console.log(this.props.data);
		// * Render cards using material ui card components
		return this.props.data.newMovies.map(movie => {
			return (
				<article key={movie.id} className="movie_list">
					<Link to={'/info/' + movie.id}>
						<img className="poster_img" src={movie.poster_path} alt="poster" />
					</Link>
				</article>
			);
		});
	}
	render() {
		if (this.props.data.loading)
			return (
				<div className="loading_message">
					<h1>loading movies...</h1>
				</div>
			);
		return (
			<div id="new_movies_container">
				<div className="home_nav">
					<a id="home_btn" href="/">
						Home
					</a>
				</div>
				{this.Movies()}
			</div>
		);
	}
}

export default graphql(getNewMovies)(NewMovies);
