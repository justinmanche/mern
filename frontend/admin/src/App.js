import React from 'react'
import BaseApp from 'shared/components/App'
import Home from 'components/Home'
import { useIsAuthenticated } from 'shared/features/user/hooks'
import PrivateRoute from 'shared/components/PrivateRoute'
import PublicRoute from 'shared/components/PublicRoute'

const App = () => {
	const isAuthenticated = useIsAuthenticated()
	
  return (
    <BaseApp>
      <PrivateRoute exact authenticated={isAuthenticated} path="/" component={Home} />
    </BaseApp>
  )
}

export default App
