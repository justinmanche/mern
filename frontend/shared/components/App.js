import React, { createElement } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom'
import { useIsAuthenticated } from 'shared/features/user/hooks'
import { useGetCurrentUserQuery } from 'shared/features/user/userSlice'
import Layout from 'features/layout'
import Error from 'shared/components/Error'
import PrivateRoute from 'shared/components/PrivateRoute'
import PublicRoute from 'shared/components/PublicRoute'
import Spinner from 'shared/components/Spinner'
import routes from 'routes'

const App = ({ children }) => {
	const { data: user, isLoading } = useGetCurrentUserQuery()
	const isAuthenticated = useIsAuthenticated()

	if (isLoading) return <Spinner />

	localStorage.setItem('userId', isAuthenticated ? user.id : '')

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
							exact: true
						}

						return createElement(component, props)
					})}
					{children}
					<Route component={Error} />
				</Switch>
			</Layout>
		</Router>
	)
}

export default App
