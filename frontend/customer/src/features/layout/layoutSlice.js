import { createSlice } from '@reduxjs/toolkit'

const layoutSlice = createSlice({
	name: 'layout',
	initialState: { sidebarOpen: false },
	reducers: {
		openSidebar: state => ({ ...state, sidebarOpen: true }),
		closeSidebar: state => ({ ...state, sidebarOpen: false })
	}
})

export const { openSidebar, closeSidebar } = layoutSlice.actions

export const selectSidebarOpen = state => state.layout.sidebarOpen

export default layoutSlice.reducer
