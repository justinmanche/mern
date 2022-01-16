import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiURL } from 'config'

const reducerPath = 'api'

export const apiSlice = createApi({
	reducerPath,
	baseQuery: fetchBaseQuery({
		baseUrl: apiURL,
		credentials: 'include'
	}),
	tagTypes: ['Item', 'CurrentUser'],
	endpoints: () => ({})
})
