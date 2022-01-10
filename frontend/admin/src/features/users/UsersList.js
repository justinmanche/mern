import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllUsers } from './usersSlice'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const UsersList = () => {
	const users = useSelector(selectAllUsers)

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
				<TableHead>
					<TableRow>
						<TableCell>Username</TableCell>
						<TableCell align="right">Type</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map(({ username, id, type }) => (
						<TableRow
							hover
							key={id}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							<TableCell
								component="th"
								scope="row">
								<Link to={`/users/${id}`}>
									{username}
								</Link>
							</TableCell>
							<TableCell align="right">{type}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)



}

export default UsersList
