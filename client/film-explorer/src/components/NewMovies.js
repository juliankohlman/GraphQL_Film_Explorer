import React, { Component } from 'react';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { getNewMovies } from '../queries/queries';

const Wrapper = styled.div`
	background: #083e4e;
	background-size: cover;
	height: 100vh;
	display: flex;
	flex-flow: column;
`;

const StyledLink = styled(Link)`
	font-size: 35px;
	font-family: Londrina Solid;
	text-decoration: none;
	color: white;
	padding: 7%;
	&:hover {
		color: #d5441d;
	}
`;

class NewMovies extends Component {
	// extrapolate Movies() out of this component
	// this can be passed to all other components
	// that return search results...Discover,Search etc..
	Movies() {
		console.log(this.props.data);
		// * Render cards using material ui card components
		return this.props.data.newMovies.map(movie => {
			return (
				<Wrapper>
					<article key={movie.id} className="movie_list">
						<Link to={'/info/' + movie.id}>
							<img
								className="poster_img"
								src={movie.poster_path}
								alt="poster"
							/>
						</Link>
					</article>
				</Wrapper>
			);
		});
	}
	render() {
		if (this.props.data.loading)
			return (
				<Wrapper>
					<div className="loading_message">
						<h1>loading movies...</h1>
					</div>
				</Wrapper>
			);
		return (
			<div id="new_movies_container">
				<div className="home_nav">
					<a id="home_btn" href="/">
						Home
					</a>
					{this.Movies()}
				</div>
			</div>
		);
	}
}

export default graphql(getNewMovies)(NewMovies);
