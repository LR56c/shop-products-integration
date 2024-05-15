export interface Result<T> {
	isLoading: boolean
	data?: T
	error?: Error
}
