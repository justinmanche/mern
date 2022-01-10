import React from 'react'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

const Error = ({ text }) => {
	return (
		<Grid container alignItems='center' alignContent='center' justifyContent='center' sx={{ height: '100vh', pb: '40vh', gap: 2 }}>
			<Typography sx={{ fontSize: '5vw' }}>
				{text || 'Oops, something went wrong...'}
			</Typography>
			<Button variant='outlined' component={Link} to={'/'}>
				Back to safety
			</Button>
		</Grid>
	)
}

export default Error
