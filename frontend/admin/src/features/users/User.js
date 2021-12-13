import React from 'react'
import { useGetUserQuery } from 'features/users/usersSlice'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Spinner from 'components/Spinner'
import Error from 'shared/components/Error'

const User = ({ match }) => {
	const { userId } = match.params
	const { data: user, isFetching, isError } = useGetUserQuery(userId)

	if (isFetching) return <Spinner text="Loading..." />
	if (isError) return <Error text="Cannot find user" />

	return (
		<Box>
			<Typography variant='h2'>{user.username}</Typography>
			<Typography variant="body2" color="text.secondary">
				{user.type}
			</Typography>
		</Box>
	)
}

export default User
