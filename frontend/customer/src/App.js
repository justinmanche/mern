import React from 'react'
import BaseApp from 'shared/components/App'
import Home from 'components/Home'
import { Route } from 'react-router-dom'

const App = () => {
  return (
    <BaseApp>
      <Route exact path='/' component={Home} />
    </BaseApp>
  )
}

export default App
