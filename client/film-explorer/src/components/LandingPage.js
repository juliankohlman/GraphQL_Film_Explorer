import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../style/assets/logo.png';
const Wrapper = styled.div`
	display: flex;
	flex-flow: column;
	margin: auto;
	background: #2953a0;
`;
const Image = styled.img`
	width: 175px;
	height: 175px;
`;

const customLandingLinks = () => (
	<Wrapper>
		<Image src={logo} />
		<div className="title">
			<h1 className="app_title">The Film Explorer</h1>
		</div>

		<nav className="nav_items">
			<Link className="landing_link" to="/movies">
				New Movies
			</Link>

			<Link className="landing_link" to="/search">
				Movie Search
			</Link>

			<Link className="landing_link" to="/discover">
				Discover Movies
			</Link>
		</nav>
	</Wrapper>
);

export default customLandingLinks;
