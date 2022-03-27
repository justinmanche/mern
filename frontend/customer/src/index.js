import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from 'App'
import { store, persistor } from 'store'
import theme from 'theme'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import AuthMiddleware from 'shared/components/AuthMiddleware'
import Spinner from 'shared/components/Spinner'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			{console.log(store)}
			{console.log(persistor)}
			<ThemeProvider theme={theme}>
				<PersistGate loading={<Spinner />} persistor={persistor}>
					<CssBaseline />
					<AuthMiddleware>
						{console.log('app')}
						<App />
					</AuthMiddleware>
				</PersistGate>
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
