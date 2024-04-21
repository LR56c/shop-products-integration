export interface HttpResultData<T> {
	data?: T;
	statusCode: number;
	message?: string;
}

