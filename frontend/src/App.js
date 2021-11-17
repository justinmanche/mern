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
import Home from 'components/Home'
import Items from 'features/items/ItemsList'

const App = () => {
	const { data: user = {} } = useGetCurrentUserQuery()
	const isAuthenticated = user._id

	console.log('User authenticated:', isAuthenticated)

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
				<Layout>
					<PrivateRoute path="/items" component={Items} />
					<PrivateRoute path="/" component={Home} />
				</Layout>
				<Route component={Error} />
			</Switch>
		</Router>
	)
}

export default App
