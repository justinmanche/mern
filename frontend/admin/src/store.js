import { configureStore } from '@reduxjs/toolkit'
import sharedStore from 'shared/store'
import { persistStore } from 'redux-persist'

export const store = configureStore(sharedStore)

export const persistor = persistStore(store)
