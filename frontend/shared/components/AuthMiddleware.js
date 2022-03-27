import React from 'react'
import Spinner from './Spinner'
import { userSlice } from 'shared/features/user/userSlice'
import { useCurrentUser } from 'shared/hooks/useAuth'

const UserMiddleware = ({ children }) => {
	const user = useCurrentUser()

	const { isFetching } = userSlice.endpoints.getUser.useQuery(null, { skip: !user.id })

	if (isFetching) {
		return (
			<Spinner />
		)
	}

	return children
}

export default UserMiddleware
