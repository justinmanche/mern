import React from 'react'
import BaseApp from 'shared/components/App'
import Home from 'components/Home'
import { useIsAuthenticated } from 'shared/features/user/hooks'
import { Route } from 'react-router-dom'
import PublicRoute from 'shared/components/PublicRoute'
import Login from 'shared/components/Login'
import Register from 'shared/components/Register'

const App = () => {
	const isAuthenticated = useIsAuthenticated()

	return (
		<BaseApp>
			<PublicRoute exact authenticated={isAuthenticated} path="/login" component={Login} type='customer' />
			<PublicRoute exact authenticated={isAuthenticated} path="/register" component={Register} type='customer' />
			<Route exact path='/' component={Home} />
		</BaseApp>
	)
}

export default App
