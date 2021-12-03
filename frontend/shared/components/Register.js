import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import { useRegisterUserMutation } from 'shared/features/user/userSlice'

const Register = () => {
	const [username, setUsername] = useState('admin@test.com')
	const [password, setPassword] = useState('password')
	const [registerUser, { isLoading, isError, error }] = useRegisterUserMutation()

	const canSave = [username, password].every(Boolean) && !isLoading

	const register = e => {
		e.preventDefault()

		if (!canSave) return

		registerUser({ username, password })
	}

	return (
		<Box sx={{ height: '100vh', margin: 'auto', alignItems: 'center', gap: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
			<form onSubmit={register}>
				<Box sx={{ gap: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
					<TextField label='Email' autoComplete='username' error={isError} helperText={isError && error.data.message} required value={username} onChange={e => setUsername(e.target.value)} />
					<TextField label='Password' type='password' required autoComplete='new-password' value={password} onChange={e => setPassword(e.target.value)} />
					<LoadingButton type='submit' variant="contained" loading={isLoading} disabled={!canSave}>Register</LoadingButton>
				</Box>
			</form>
			<Button component={Link} to='/login' variant='text' size='small'>Sign in</Button>
		</Box>
	)
}

export default Register
