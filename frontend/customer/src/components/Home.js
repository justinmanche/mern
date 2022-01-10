import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { queryify } from 'shared/helpers'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const Home = () => {
	const [search, setSearch] = useState('')
	const history = useHistory()

	const go = e => {
		e.preventDefault()
		history.push({
			pathname: '/items',
			search: queryify({ query: search })
		})
	}

	return (
		<Grid container direction='column' justifyContent='center' alignItems='center' sx={{ height: '100vh', paddingBottom: '40vh' }}>
			<Grid item>
				<Typography sx={{ fontSize: '5vw' }}>
					Mongo | Express | React | Node
				</Typography>
			</Grid>
			<Grid item sx={{ width: '60%', pt: 3, display: 'flex', flexWrap: { xs: 'wrap', md: 'nowrap' }, justifyContent: 'center', gap: 1 }}>
				<TextField fullWidth label="Search for an item" value={search} onChange={e => setSearch(e.target.value)}
					onKeyUp={e => { if (e.keyCode === 13) go(e) }} />
				<Button variant="contained" onClick={go}>Search</Button>
			</Grid>
		</Grid>
	)
}

export default Home
