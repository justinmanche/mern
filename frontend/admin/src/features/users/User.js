import React from 'react'
import { useCurrentUser } from 'shared/hooks/useAuth'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const User = () => {
	const user = useCurrentUser()

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
