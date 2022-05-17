import React from 'react'
import ReactDOM from 'react-dom'
import BaseIndex from 'shared/components/BaseIndex'
import Home from 'components/Home'
import PrivateRoute from 'shared/components/PrivateRoute'
import PublicRoute from 'shared/components/PublicRoute'
import Login from 'shared/components/Login'
import Register from 'shared/components/Register'

ReactDOM.render(
	<BaseIndex>
		<PublicRoute exact path="/login" component={Login} type='admin' />
		<PublicRoute exact path="/register" component={Register} type='admin' />
		<PrivateRoute exact path="/" component={Home} />
	</BaseIndex>,
	document.getElementById('root')
)
