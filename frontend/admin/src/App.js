import React from 'react'
import BaseApp from 'shared/components/App'
import Home from 'components/Home'
import { useIsAuthenticated } from 'shared/features/user/hooks'
import PrivateRoute from 'shared/components/PrivateRoute'
import PublicRoute from 'shared/components/PublicRoute'
import Login from 'shared/components/Login'
import Register from 'shared/components/Register'

const App = () => {
	const isAuthenticated = useIsAuthenticated()

	return (
		<BaseApp>
			<PublicRoute exact authenticated={isAuthenticated} path="/login" component={Login} type='admin' />
			<PublicRoute exact authenticated={isAuthenticated} path="/register" component={Register} type='admin' />
			<PrivateRoute exact authenticated={isAuthenticated} path="/" component={Home} />
		</BaseApp>
	)
}

export default App
