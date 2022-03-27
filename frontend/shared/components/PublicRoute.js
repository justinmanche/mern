import React, { createElement } from 'react'
import { useAuth } from 'shared/hooks/useAuth'
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = ({ component, ...rest }) => {
	const authenticated = useAuth()
	const render = props => {
		if (authenticated) return <Redirect to={{ pathname: '/' }} />

		return createElement(component, { ...props, ...rest })
	}

	return <Route {...rest} render={render} />
}

export default PublicRoute
