import React, { createElement } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom'
import Layout from 'features/layout'
import Error from 'shared/components/Error'
import PrivateRoute from 'shared/components/PrivateRoute'
import PublicRoute from 'shared/components/PublicRoute'
import routes from 'routes'

const BaseApp = ({ children }) => (
	<Router>
		<Layout>
			<Switch>
				{routes.map(route => {
					const { private: privateRoute, ...rest } = route
					const component = privateRoute ? PrivateRoute : PublicRoute
					const props = {
						...rest,
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

export default BaseApp
