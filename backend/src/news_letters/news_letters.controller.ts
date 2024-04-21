import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus
} from '@nestjs/common'
import { NewsLetter } from '~features/news_letter/domain/models/NewsLetter'
import { HttpResultData } from '~features/shared/utils/HttpResultData'
import { NewsLettersService } from './news_letters.service'
import { CreateNewsLetterDto } from './dto/create-news_letter.dto'
import { UpdateNewsLetterDto } from './dto/update-news_letter.dto'

// presentacion (como interactua el usuario): frontend = page / backend = controller/api
// comunicacion con el negocio = backend: service / frontend: viewModel (react: hooks)
// dominio (negocio) (usuarios, notificaciones)
    // nucleo
        // que cosas se usan
    // casos de uso
        // como se comportan
    // infraestructura
        // como se conecta el exterior

@Controller( 'news-letters' )
export class NewsLettersController {
	constructor( private readonly newsLettersService: NewsLettersService ) {}

	@Post()
	create( @Body() createNewsLetterDto: CreateNewsLetterDto ) {
		return this.newsLettersService.create( createNewsLetterDto )
	}

	@Get()
	 async findAll(): Promise<HttpResultData<NewsLetter[]>> {
		try {
      const newsletter =  await this.newsLettersService.findAll()
      return {
        data: newsletter,
        statusCode: HttpStatus.OK
      }
		}
		catch ( e ) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "muri"
      }
		}
	}

	@Get( ':id' )
	findOne( @Param( 'id' ) id: string ) {
		return this.newsLettersService.findOne( +id )
	}

	@Patch( ':id' )
	update( @Param( 'id' ) id: string,
		@Body() updateNewsLetterDto: UpdateNewsLetterDto )
	{
		return this.newsLettersService.update( +id, updateNewsLetterDto )
	}

	@Delete( ':id' )
	remove( @Param( 'id' ) id: string ) {
		return this.newsLettersService.remove( +id )
	}
}
