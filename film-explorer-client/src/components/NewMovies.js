import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
// import { withStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';

import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { getNewMovies } from '../queries/queries';
import { CardActionArea } from '@material-ui/core';

const Wrapper = styled.div`
	background: #083e4e;
	background-size: cover;
	// // display: grid;
	// // columns: 3;
	// // height: 100vh;
	// // display: flex;
	// // flex-direction: row;
	// // flex-flow: column;
`;

// const PosterImage = styled.img`
// 	position: absolute;
// 	left: 0;
// 	top: 0;
// 	width: 100%;
// 	height: auto;
// 	// background: #083e4e;
// 	// display: grid;
// 	// padding: 15px;
// 	// margin: 0 20px 0 20px;
// 	// width: 100%;
// 	// float: left;
// 	// position: relative;
// `;

const StyledLink = styled(Link)`
	font-size: 35px;
	font-family: Londrina Solid;
	text-decoration: none;
	color: white;
	// padding: 7%;
	&:hover {
		color: #d5441d;
	}
`;

const styles = {
	movieColumn: {
		marginBottom: 20
	}
};

class NewMovies extends Component {
	// extrapolate Movies() out of this component
	// this can be passed to all other components
	// that return search results...Discover,Search etc..
	Movies() {
		console.log(this.props.data);
		const { classes } = this.props;
		return this.props.data.newMovies.map(movie => {
			return (
				// <MovieContainer>
				// 	<Card className={classes.card} key={movie.id}>
				// 		<CardActionArea>
				// 			<Link to={`/info/${movie.id}`}>
				// 				<CardMedia
				// 					className={classes.media}
				// 					image={movie.poster_path}
				// 				/>
				// 			</Link>
				// 		</CardActionArea>
				// 	</Card>
				// </MovieContainer>
				// <Wrapper key={movie.id}>
				// {/* <article key={movie.id} className="movie_list"> */}
				<Row>
					<Link to={'/info/' + movie.id}>
						<img className="poster_img" src={movie.poster_path} alt="poster" />
					</Link>
				</Row>
				// {/* </article> */}
				// </Wrapper>
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
			// <MovieContainer>
			<Wrapper>
				<StyledLink to="/">Home</StyledLink>
				<br />
				<Col style={styles.movieColumn} xs={12} sm={4} md={3} lg={3}>
					<Row>{this.Movies()}</Row>
				</Col>
			</Wrapper>
			// </MovieContainer>
		);
	}
}

NewMovies.propTypes = {
	classes: PropTypes.object.isRequired
};

export default graphql(getNewMovies)(NewMovies);
// export default withStyles(styles)(graphql(getNewMovies)(NewMovies));
