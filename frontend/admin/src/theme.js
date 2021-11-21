import { blue } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export default createTheme({
	typography: {
		button: {
			fontSize: '1rem'
		}
	},
	palette: {
		card: {
			background: blue[50]
		}
	}
})
