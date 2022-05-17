import React, { StrictMode } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import BaseApp from 'shared/components/BaseApp'
import { store, persistor } from 'store'
import theme from 'theme'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import AuthMiddleware from 'shared/components/AuthMiddleware'
import Spinner from 'shared/components/Spinner'

const BaseIndex = ({ children }) => (
	<StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<PersistGate loading={<Spinner />} persistor={persistor}>
					<CssBaseline />
					<AuthMiddleware>
						<BaseApp>
							{children}
						</BaseApp>
					</AuthMiddleware>
				</PersistGate>
			</ThemeProvider>
		</Provider>
	</StrictMode>
)

export default BaseIndex
