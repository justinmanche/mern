import React, { createElement } from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component, authenticated, ...rest }) => {
  const render = props => {
    if (authenticated) return createElement(component, props)

    return (
      <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )
  }

  return <Route {...rest} render={render} />
}

export default PrivateRoute
