import { Translation } from "../services/translation/utils/translation_model";

export interface HttpResultData<T> {
	data?: T;
	statusCode: number;
	message?: Translation;
}

