import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from 'components/Navbar'
import { ItemsList } from 'features/items/ItemsList'
import { AddItemForm } from 'features/items/AddItemForm'
import { EditItemForm } from 'features/items/EditItemForm'
import { SingleItemPage } from 'features/items/SingleItemPage'
import Error from "components/Error"

function App() {
  const isAuthenticated = true // ToDo: use user.logged_in

  const PrivateRoute = ({ component, ...rest }) => {
    const render = props => {
      if (isAuthenticated) return React.createElement(component, props)

      return (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }

    return <Route {...rest} render={component} />
  )

  const PublicRoute = ({ component, ...rest }) => {
    const render = props => {
      if (isAuthenticated) return <Redirect to={{ pathname: "/" }} />

      return React.createElement(component, props)
    }

    return <Route {...rest} render={component} />
  }

  return (
    <Router>
      <div className="px-10">
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <AddItemForm />
                <ItemsList />
              </React.Fragment>
            )}
          />
          <Route exact path="/items/:itemId" component={SingleItemPage} />
          <Route exact path="/editItem/:itemId" component={EditItemForm} />
          <Route component={Error} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
