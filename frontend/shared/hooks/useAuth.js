import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from 'shared/features/authSlice'


export const useCurrentUser = () => {
	const user = useSelector(selectCurrentUser)

	return useMemo(() => ({ ...user }), [user])
}

export const useAuth = () => {
	const user = useCurrentUser()

	return !!user.id
}
