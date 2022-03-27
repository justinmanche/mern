import React from 'react'
import BaseApp from 'shared/components/App'
import Home from 'components/Home'
import PrivateRoute from 'shared/components/PrivateRoute'
import PublicRoute from 'shared/components/PublicRoute'
import Login from 'shared/components/Login'
import Register from 'shared/components/Register'

const App = () => (
	<BaseApp>
		<PublicRoute exact path="/login" component={Login} type='admin' />
		<PublicRoute exact path="/register" component={Register} type='admin' />
		<PrivateRoute exact path="/" component={Home} />
	</BaseApp>
)

export default App
