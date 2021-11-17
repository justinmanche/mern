import React, { useState } from 'react'
import {
	Route,
	Switch,
	withRouter,
	Link as RouterLink
} from 'react-router-dom'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { AppBarSpacer, Drawer, List, Toolbar } from './styledComponents'
import ListAltIcon from '@mui/icons-material/ListAlt'
import HomeIcon from '@mui/icons-material/Home'

const Layout = ({ children }) => {
	const [open, setOpen] = useState(false)
	const links = [
		{ text: 'Home', url: '/', icon: <HomeIcon /> },
		{ text: 'Items', url: '/items', icon: <ListAltIcon /> }
	]

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={() => setOpen(!open)}
						sx={{
							marginRight: '36px'
						}}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
            MERN
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<AppBarSpacer />
				<List>
					{links.map(({ text, url, icon }) => (
						<ListItem button key={text} component={RouterLink} to={url}>
							<ListItemIcon>
								{icon}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</Drawer>
			<Box component="main" sx={{ px: 3 }}>
				<AppBarSpacer />
				{children}
			</Box>
		</Box>
	)
}

export default withRouter(Layout)
