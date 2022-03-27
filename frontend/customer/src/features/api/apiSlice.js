import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userSlice } from 'shared/features/user/userSlice'
import { apiURL } from 'config'

const reducerPath = 'api'

const baseQuery = fetchBaseQuery({
	baseUrl: apiURL,
	credentials: 'include'
})
const baseQueryWithLogout = async (args, api, extraOptions) => {
	const result = await baseQuery(args, api, extraOptions)

	if (result.error && result.error.status === 401) {
		api.dispatch(userSlice.endpoints.logout.initiate())
	} else {
		return result
	}
}

export const apiSlice = createApi({
	reducerPath,
	baseQuery: baseQueryWithLogout,
	tagTypes: ['Item'],
	endpoints: () => ({})
})
