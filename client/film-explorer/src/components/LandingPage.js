import React from 'react';
import { Link } from 'react-router-dom';

const customLandingLinks = () => (
	<div>
		<h1>Insert cool App name here</h1>
		<li>
			<Link to="/movies">New Movies</Link>
		</li>
	</div>
);

export default customLandingLinks;
