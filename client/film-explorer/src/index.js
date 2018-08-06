import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { HashRouter, Switch, Route } from 'react-router-dom';
import NewMovies from './components/NewMovies';
// import './styles/style.css';
// import './index.css';
const client = new ApolloClient();
const Root = () => {
	return (
		<HashRouter>
			<ApolloProvider client={client}>
				<Switch>
					<Route exact path="/" component={NewMovies} />
				</Switch>
			</ApolloProvider>
		</HashRouter>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
