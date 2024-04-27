import { Category } from 'features/categories/domain/models/category'

export function categoryFromJson(json : Record<string, any> ) : Category | Error{
	try {
		return Category.from(json.name)
	}
	catch ( e ){
		return e
	}
}

export function categoryToJson(categor : Category): Record<string, any> {
	return {
		name: categor.name.value
	}
}
