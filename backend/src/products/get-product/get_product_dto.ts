import {
	IsString,
	MinLength
} from 'class-validator'

export class GetProductDto {

	@MinLength( 1 )
	@IsString()
	product_code: string
}
