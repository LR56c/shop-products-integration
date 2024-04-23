import { Translation } from 'backend/src/shared/infrastructure/parseTranslation'

export interface HttpResultData<T> {
	data?: T;
	statusCode: number;
	message?: Translation;
}

