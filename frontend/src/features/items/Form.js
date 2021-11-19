import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton'
import Paper from '@mui/material/Paper'

const Form = ({ item, submit, isLoading }) => {
	const [title, setTitle] = useState(item?.title || '')
	const [content, setContent] = useState(item?.content || '')

	const canSave = [title, content].every(Boolean) && !isLoading

	const handleSubmit = e => {
		e.preventDefault()

		if (canSave) {
			submit({ title, content })
			if (!item) {
				setTitle('')
				setContent('')
			}
		}
	}

	return (
		<Paper elevation={3} sx={{ p: 5, bgcolor: 'card.background' }}>
			<form onSubmit={handleSubmit}>
				<Box sx={{ gap: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<TextField label='Title' required value={title} onChange={e => setTitle(e.target.value)} />
					<TextField label='Content' required value={content} onChange={e => setContent(e.target.value)} />
					<LoadingButton type='submit' variant="contained" loading={isLoading} disabled={!canSave}>Save Item</LoadingButton>
				</Box>
			</form>
		</Paper>
	)
}
export default Form
