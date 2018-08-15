import React from 'react';
import ReactDOM from 'react-dom';
import NewMovies from './NewMovies';

import { Link } from 'react-router-dom';

const customLandingLinks = () => (
	<div>
		<h1>NEW MOVIES</h1>
		<li>
			<Link to="/movies">New Movies</Link>
		</li>
	</div>
);

// const customLandingLinks = () => {
// 	<Router>
// 		<div>
// 			<h1>NEW MOVIES</h1>
// 			<Route exact path="/movies" component={NewMovies} />
// 		</div>
// 	</Router>;
// };

export default customLandingLinks;
