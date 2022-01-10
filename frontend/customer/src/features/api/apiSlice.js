import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const reducerPath = 'api'

export const apiSlice = createApi({
	reducerPath,
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3000/api',
		credentials: 'include'
	}),
	tagTypes: ['Item', 'CurrentUser'],
	endpoints: () => ({})
})
