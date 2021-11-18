import React, { createElement, Fragment } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom'
import { useGetCurrentUserQuery } from 'features/user/userSlice'
import AuthLayout from 'features/Layout'
import Login from 'components/Login'
import Register from 'components/Register'
import Error from 'components/Error'
import Home from 'components/Home'
import Items from 'features/items/ItemsList'

const App = () => {
	const { data: user, isFetching } = useGetCurrentUserQuery()

	if (!isFetching) {
		localStorage.setItem('userId', user ? user.id : '')
	}

	const localUserId = localStorage.getItem('userId')
	const isAuthenticated = !!localUserId

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

	const Layout = ({ children }) => {
		if (!isAuthenticated) return <>{children}</>

		return <AuthLayout>{children}</AuthLayout>
	}

	return (
		<Router>
			<Layout>
				<Switch>
					<PublicRoute path="/login" component={Login} />
					<PublicRoute path="/register" component={Register} />
					<PrivateRoute exact path="/" component={Home} />
					<PrivateRoute path="/items" component={Items} />
					<Route component={Error} />
				</Switch>
			</Layout>
		</Router>
	)
}

export default App
