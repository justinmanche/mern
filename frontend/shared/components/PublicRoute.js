import React, { createElement } from 'react'
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = ({ component, authenticated, ...rest }) => {
	const render = props => {
		if (authenticated) return <Redirect to={{ pathname: '/' }} />

		return createElement(component, props)
	}

	return <Route {...rest} render={render} />
}

export default PublicRoute
