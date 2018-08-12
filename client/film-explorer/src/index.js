import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { HashRouter, Switch, Route } from 'react-router-dom';
import NewMovies from './components/NewMovies';
import MovieInfo from './components/MovieInfo';

import './styles/style.css';

const client = new ApolloClient();

const Root = () => {
	return (
		<HashRouter>
			<ApolloProvider client={client}>
				<Switch>
					<Route exact path="/graphql" component={NewMovies} />
					<Route exact path="/info/:id" component={MovieInfo} />
				</Switch>
			</ApolloProvider>
		</HashRouter>
	);
};

ReactDOM.render(<Root />, document.getElementById('root'));
