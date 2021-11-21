import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom'
import Error from 'components/Error'
import Home from 'components/Home'

const App = () => {

	return (
		<Router>
			<Switch>
				<Route path='/' exact component={Home} />
				<Route component={Error} />
			</Switch>
		</Router>
	)
}

export default App
