import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { parseTranslation } from 'src/shared/infrastructure/parseTranslation'
import { NewsLetter } from '~features/news_letter/domain/models/NewsLetter'
import { InvalidIntegerException } from '~features/shared/domain/exceptions/InvalidIntegerException'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import {
	FlatErrors,
	flatErrors
} from '~features/shared/utils/FlatErrors'
import { HttpResultData } from '~features/shared/utils/HttpResultData'
import { wrapType } from '~features/shared/utils/WrapType'
import { CreateNewsLetterDto } from './dto/create-news_letter.dto'
import { NewsLettersService } from './news_letters.service'

@Controller( 'news-letters' )
export class NewsLettersController {
	constructor( private readonly newsLettersService: NewsLettersService ) {}

	@Post()
	create( @Body() createNewsLetterDto: CreateNewsLetterDto ) {
		return false
	}


	@Get()
	async findAll( @Body("limit") limit: number ): Promise<HttpResultData<NewsLetter[]>> {
		try {
			const { limit : limitResult, errors } = this.parseGetAllParams( limit )
			if ( errors && errors.length > 0 ) {
				return {
					statusCode: HttpStatus.BAD_REQUEST,
					message   : parseTranslation( errors )
				}
			}

			const newsletter = await this.newsLettersService.getAll(
				limitResult as ValidInteger )
			return {
				data      : newsletter,
				statusCode: HttpStatus.OK
			}
		}
		catch ( e ) {
			return {
				statusCode: HttpStatus.BAD_REQUEST
			}
		}
	}

	parseGetAllParams( limit : number ): {
		limit?: ValidInteger,
		errors?: FlatErrors[]
	}
	{
		let errors: Error[] = []

		const limitResult = wrapType<ValidInteger, InvalidIntegerException>(
			() => ValidInteger.from( limit ) )

		if ( limitResult instanceof Error ) {
			errors.push( limitResult )
		}

		if ( errors.length > 0 ) {
			return {
				errors: flatErrors( errors )
			}
		}

		return {
			limit: limitResult as ValidInteger
		}
	}

	@Get( ':id' )
	findOne( @Param( 'id' ) id: string ) {
		return ''
	}

	@Patch( ':id' )
	update( @Param( 'id' ) id: string )
	{
		return ''
	}

	@Delete( ':id' )
	remove( @Param( 'id' ) id: string ) {
		return ''
	}
}
