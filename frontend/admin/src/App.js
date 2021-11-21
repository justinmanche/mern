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
import PrivateRoute from 'shared/components/PrivateRoute'
import PublicRoute from 'shared/components/PublicRoute'
import routes from 'routes'

const App = () => {
	const { data: user, isFetching, isSuccess } = useGetCurrentUserQuery()

	if (!isFetching) {
		localStorage.setItem('userId', user && isSuccess ? user.id : '')
	}

	const localUserId = localStorage.getItem('userId')
	const isAuthenticated = !!localUserId

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
						const component = privateRoute ? PrivateRoute : PublicRoute
						const props = {
							...rest,
							authenticated: isAuthenticated,
							key: rest.path,
							exact: true,
						}

						return createElement(component, props)
					})}
					<PublicRoute exact authenticated={isAuthenticated} path="/login" component={Login} />
					<PublicRoute exact authenticated={isAuthenticated} path="/register" component={Register} />
					<PrivateRoute exact authenticated={isAuthenticated} path="/" component={Home} />
					<Route component={Error} />
				</Switch>
			</Layout>
		</Router>
	)
}

export default App
