import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import {
	Route,
	Switch,
	withRouter
} from 'react-router-dom'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import MuiToolbar from '@mui/material/Toolbar'
import MuiList from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import Home from 'components/Home'

const drawerWidth = 240

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen
	}),
	overflowX: 'hidden'
})

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(9)} + 1px)`
	}
})

const AppBarSpacer = styled('div')(({ theme }) => {
	console.log(theme.mixins.toolbar)
	window.theme = theme
	return {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar
	}})

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...(open && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme)
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme)
		})
	})
)

const List = styled(MuiList)(({ theme }) => ({
	[theme.breakpoints.up('sm')]: {
		paddingLeft: theme.spacing(1)
	}
}))

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
	paddingLeft: theme.spacing(1),
	[theme.breakpoints.up('sm')]: {
		paddingLeft: theme.spacing(2)
	}
}))

const Layout = () => {
	const theme = useTheme()
	const [open, setOpen] = React.useState(false)

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
					{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					{['All mail', 'Trash', 'Spam'].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</Drawer>
			<Box component="main" sx={{ px: 3 }}>
				<AppBarSpacer />
				<Switch>
					<Route path="/" component={Home} />
				</Switch>
			</Box>
		</Box>
	)
}

export default withRouter(Layout)
