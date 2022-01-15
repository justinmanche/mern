import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiHost } from 'config'

const reducerPath = 'api'

export const apiSlice = createApi({
	reducerPath,
	baseQuery: fetchBaseQuery({
		baseUrl: `${apiHost}/api`,
		credentials: 'include'
	}),
	tagTypes: ['Item', 'CurrentUser'],
	endpoints: () => ({})
})
