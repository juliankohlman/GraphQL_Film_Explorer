import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { HashRouter, Switch, Route } from 'react-router-dom';
import NewMovies from './components/NewMovies';
import MovieInfo from './components/MovieInfo';
import LandingPage from './components/LandingPage';
import MovieSearch from './components/MovieSearch';
import DiscoverMovies from './components/DiscoverMovie';
import styles from './style/css/main.css';

const client = new ApolloClient({
	// Burned a lot of time b/f realizing I was not providing the client side w/the proper endpoint
	uri: `http://localhost:4000/graphql`
});
const App = () => {
	return (
		<HashRouter>
			<ApolloProvider client={client}>
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/movies" component={NewMovies} />
					<Route exact path="/info/:id" component={MovieInfo} />
					<Route exact path="/search" component={MovieSearch} />
					<Route exact path="/discover" component={DiscoverMovies} />
				</Switch>
			</ApolloProvider>
		</HashRouter>
	);
};
ReactDOM.render(<App />, document.querySelector('#root'));
