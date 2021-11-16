import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useLoginUserMutation } from 'features/user/userSlice'

const Login = () => {
	const [email, setEmail] = useState(null)
	const [password, setPassword] = useState(null)
	const [loginUser, { isLoading }] = useLoginUserMutation()

	const canSave = [email, password].every(Boolean) && !isLoading

	const login = e => {
		e.preventDefault()

		if (canSave) {
			const params = { email, password }
			console.log(params)
			loginUser(params)
			console.log(`Logging in with ${email} / ${password}`)
		} else {
			console.error('Cannot submit')
		}
	}

	return (
		<form onSubmit={login}>
			<Box sx={{ height: '100vh', gap: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
				<TextField label='email' onChange={e => setEmail(e.target.value)} />
				<TextField label='password' onChange={e => setPassword(e.target.value)} />
				<Button type='submit' variant="contained" disabled={!canSave}>Login</Button>
			</Box>
		</form>
	)
}

export default Login
