import React, { createElement, Fragment } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom'
import { useGetCurrentUserQuery } from 'features/user/userSlice'
import AuthLayout from 'features/layout/AuthLayout'
import Login from 'components/Login'
import Register from 'components/Register'
import Error from 'components/Error'
import Home from 'components/Home'
import routes from 'routes'

const App = () => {
	const { data: user, isFetching, isSuccess } = useGetCurrentUserQuery()

	if (!isFetching) {
		localStorage.setItem('userId', user && isSuccess ? user.id : '')
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
					{routes.map(route => {
						const { private: privateRoute, ...rest } = route
						const Wrapper = privateRoute ? PrivateRoute : PublicRoute

						return <Wrapper key={rest.path} exact {...rest} />
					})}
					<PublicRoute exact path="/login" component={Login} />
					<PublicRoute exact path="/register" component={Register} />
					<PrivateRoute exact path="/" component={Home} />
					<Route component={Error} />
				</Switch>
			</Layout>
		</Router>
	)
}

export default App
