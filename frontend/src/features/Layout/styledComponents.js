import MuiDrawer from '@mui/material/Drawer'
import MuiToolbar from '@mui/material/Toolbar'
import MuiList from '@mui/material/List'
import { styled } from '@mui/material/styles'

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

export const AppBarSpacer = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar
}))

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
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

export const List = styled(MuiList)(({ theme }) => ({
	[theme.breakpoints.up('sm')]: {
		paddingLeft: theme.spacing(1)
	}
}))

export const Toolbar = styled(MuiToolbar)(({ theme }) => ({
	paddingLeft: theme.spacing(1),
	[theme.breakpoints.up('sm')]: {
		paddingLeft: theme.spacing(2)
	}
}))
