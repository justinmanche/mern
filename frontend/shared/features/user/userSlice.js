import { apiSlice } from 'features/api/apiSlice'

export const userSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query({
			query: () => '/user/current'
		}),
		login: builder.mutation({
			query: params => ({
				url: '/login',
				method: 'POST',
				body: params
			})
		}),
		register: builder.mutation({
			query: params => ({
				url: '/register',
				method: 'POST',
				body: params
			})
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/logout',
				method: 'POST'
			})
		})
	})
})

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation
} = userSlice
