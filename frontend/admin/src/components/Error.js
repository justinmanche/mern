import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const Error = ({ text }) => {
	return (
		<Box>
			<Typography variant='h1'>{text || 'Oops, something went wrong...'}</Typography>
		</Box>
	)
}

export default Error
