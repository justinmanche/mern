import React from 'react'
import ReactDOM from 'react-dom'
import BaseIndex from 'shared/components/BaseIndex'
import Home from 'components/Home'
import { Route } from 'react-router-dom'
import PublicRoute from 'shared/components/PublicRoute'
import Login from 'shared/components/Login'
import Register from 'shared/components/Register'

ReactDOM.render(
	<BaseIndex>
		<PublicRoute exact path="/login" component={Login} type='customer' />
		<PublicRoute exact path="/register" component={Register} type='customer' />
		<Route exact path='/' component={Home} />
	</BaseIndex>,
	document.getElementById('root')
)
