import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
	margin: auto;
	background: #2953a0;
`;

const customLandingLinks = () => (
	<Wrapper>
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
