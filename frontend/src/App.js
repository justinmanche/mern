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

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
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
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
