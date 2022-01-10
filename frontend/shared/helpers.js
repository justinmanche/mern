export const queryify = params => {
	const hasParams = Object.values(params).filter(Boolean).length > 0

	if (!hasParams) return ''
  
	const query = new URLSearchParams(params).toString()

	return `?${query}`
}
