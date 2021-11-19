import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton'
import { Link } from 'react-router-dom'
import { useLoginUserMutation } from 'features/user/userSlice'

const Login = () => {
	const [username, setUsername] = useState('admin@test.com')
	const [password, setPassword] = useState('password')
	const [loginUser, { isLoading, isError, error }] = useLoginUserMutation()

	const canSave = [username, password].every(Boolean) && !isLoading

	const login = e => {
		e.preventDefault()

		if (!canSave) return

		loginUser({ username, password })
	}

	return (
		<form onSubmit={login}>
			<Box sx={{ height: '100vh', margin: 'auto', alignItems: 'center', gap: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
				<Box sx={{ gap: 2, width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
					<TextField fullWidth label='Email' autoComplete='username' error={isError} helperText={isError && error.data.message} required value={username} onChange={e => setUsername(e.target.value)} />
					<TextField fullWidth label='Password' type='password' required autoComplete='current-password' value={password} onChange={e => setPassword(e.target.value)} />
					<LoadingButton type='submit' variant="contained" loading={isLoading} disabled={!canSave}>Login</LoadingButton>
				</Box>
				<Button component={Link} to='/register' variant='text' size='small'>Register</Button>
			</Box>
		</form>
	)
}

export default Login
