import React from 'react';
import styled from 'styled-components';
import logo from '../style/assets/logo.png';
import theaterBG from '../style/assets/theater.jpg';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
	// background: #083e4e;
	background: url(${theaterBG});
	background-size: cover;
	height: 100vh;
	display: flex;
	flex-flow: column;
`;
const Image = styled.img`
	border-radius: 15px;
	margin-top: 10%;
	margin-right: auto;
	margin-left: auto;
	width: 250px;
	height: 250px;
`;
const LinkList = styled.div`
	display: flex;
	flex-flow: column;
	align-self: center;
	margin: 25px;
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

const customLandingLinks = () => (
	<Wrapper>
		<Image src={logo} />

		<LinkList>
			<StyledLink to="/movies">New Movies</StyledLink>

			<StyledLink to="/search">Movie Search</StyledLink>

			<StyledLink to="/discover">Discover Movies</StyledLink>
		</LinkList>
	</Wrapper>
);

export default customLandingLinks;
