import { Translation } from '../services/translation/utils/translation_model'

export interface HttpResult {
	statusCode: number;
	message?: Translation;
}
