import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
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
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { useLogoutUserMutation } from 'features/user/userSlice'
import Breadcrumbs from './Breadcrumbs'
import UsersIcon from '@mui/icons-material/PeopleAlt'

const AuthLayout = ({ children }) => {
	const [open, setOpen] = useState(false)
	const [menuAnchor, setMenuAnchor] = useState(null)
	const [logoutUser] = useLogoutUserMutation()
	const links = [
		{ text: 'Home', url: '/', icon: <HomeIcon /> },
		{ text: 'Items', url: '/items', icon: <ListAltIcon /> },
		{ text: 'Users', url: '/users', icon: <UsersIcon /> }
	]
	const closeMenu = () => setMenuAnchor(null)
	const logout = () => {
		logoutUser()
		setMenuAnchor(null)
	}

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
					<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            MERN
					</Typography>
					<div>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={e => setMenuAnchor(e.currentTarget)}
							color="inherit">
							<AccountCircle />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={menuAnchor}
							open={Boolean(menuAnchor)}
							onClose={closeMenu}>
							<MenuItem onClick={logout}>Logout</MenuItem>
						</Menu>
					</div>
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
				<Breadcrumbs />
				{children}
			</Box>
		</Box>
	)
}

export default AuthLayout
