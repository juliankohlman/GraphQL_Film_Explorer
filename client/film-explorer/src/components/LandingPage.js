import React from 'react';
import { Link } from 'react-router-dom';

const customLandingLinks = () => (
	<div className="landing">
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
	</div>
);

export default customLandingLinks;
