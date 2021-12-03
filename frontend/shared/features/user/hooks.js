import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedIn } from 'shared/features/user/userSlice'

export const useIsAuthenticated = () => {
	const auth = useSelector(selectLoggedIn)

  return auth
}
