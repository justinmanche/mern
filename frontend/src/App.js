import React, { createElement } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser, useGetCurrentUserQuery } from 'features/user/userSlice'
import Layout from 'features/Layout'
import Login from 'components/Login'
import Register from 'components/Register'
import Error from 'components/Error'

const App = () => {
	// const user = useSelector(selectCurrentUser)
	const { data: user = {} } = useGetCurrentUserQuery()
	const isAuthenticated = user._id

	const PrivateRoute = ({ component, ...rest }) => {
		const render = props => {
			if (isAuthenticated) return createElement(component, props)

			return (
				<Redirect to={{ pathname: '/login', state: { from: props.location } }} />
			)
		}

		return <Route {...rest} render={render} />
	}

	const PublicRoute = ({ component, ...rest }) => {
		const render = props => {
			if (isAuthenticated) return <Redirect to={{ pathname: '/' }} />

			return createElement(component, props)
		}

		return <Route {...rest} render={render} />
	}

	return (
		<Router>
			<Switch>
				<PublicRoute path="/login" component={Login} />
				<PublicRoute path="/register" component={Register} />
				<PrivateRoute path="/" component={Layout} />
				<Route component={Error} />
			</Switch>
		</Router>
	)
}

export default App
