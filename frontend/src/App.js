import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom'
import Layout from 'components/Layout'
import Login from 'components/Login'
import Error from 'components/Error'

function App() {
	const isAuthenticated = true // ToDo: use user.logged_in

	const PrivateRoute = ({ component, ...rest }) => {
		const render = props => {
			if (isAuthenticated) return React.createElement(component, props)

			return (
				<Redirect to={{ pathname: '/login', state: { from: props.location } }} />
			)
		}

		return <Route {...rest} render={render} />
	}

	const PublicRoute = ({ component, ...rest }) => {
		const render = props => {
			if (isAuthenticated) return <Redirect to={{ pathname: '/' }} />

			return React.createElement(component, props)
		}

		return <Route {...rest} render={render} />
	}

	return (
		<Router>
			<Switch>
				<Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
				<Route exact path="/app" render={() => <Redirect to="/app/dashboard" />} />
				<PrivateRoute path="/app" component={Layout} />
				<PublicRoute path="/login" component={Login} />
				<Route component={Error} />
			</Switch>
		</Router>
	)
}

export default App
