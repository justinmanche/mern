import React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const Home = () => {
	return (
		<Grid container justifyContent='center' alignItems='center' sx={{ height: '100vh', paddingBottom: '40vh' }}>
			<Typography sx={{ fontSize: '5vw' }}>
					Mongo | Express | React | Node
			</Typography>
		</Grid>
	)
}

export default Home
