import React from 'react'
import BaseApp from 'shared/components/App'
import Home from 'components/Home'
import { Route } from 'react-router-dom'
import PublicRoute from 'shared/components/PublicRoute'
import Login from 'shared/components/Login'
import Register from 'shared/components/Register'

const App = () => (
	<BaseApp>
		<PublicRoute exact path="/login" component={Login} type='customer' />
		<PublicRoute exact path="/register" component={Register} type='customer' />
		<Route exact path='/' component={Home} />
	</BaseApp>
)

export default App
