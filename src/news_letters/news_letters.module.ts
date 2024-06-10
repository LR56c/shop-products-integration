import {
	forwardRef,
	Module
} from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'
import { NewsLetterRepository } from '../../packages/news_letter/domain/news_letter_repository'
import { NewsLetterSupabaseData } from '../../packages/news_letter/infrastructure/news_letter_supabase_data'
import { AppModule } from '../app.module'
import { AddNewsLetterController } from './add-news-letter/add-news-letter.controller'
import { AddNewsLetterService } from './add-news-letter/add-news-letter.service'
import { CheckNewsLetterController } from './check-news-letter/check-news-letter.controller'
import { CheckNewsLetterService } from './check-news-letter/check-news-letter.service'
import { GetAllNewsLetterController } from './get-all-news-letter/get-all-news-letter.controller'
import { GetAllNewsLetterService } from './get-all-news-letter/get-all-news-letter.service'
import { RemoveNewsLetterController } from './remove-news-letter/remove-news-letter.controller'
import { RemoveNewsLetterService } from './remove-news-letter/remove-news-letter.service'

@Module( {
	imports    : [ forwardRef( () => AppModule ) ],
	controllers: [ AddNewsLetterController,
		RemoveNewsLetterController, CheckNewsLetterController,
		GetAllNewsLetterController ],
	providers  : [
		{
			provide   : NewsLetterRepository,
			useFactory: ( client: SupabaseClient<Database> ) => {
				return new NewsLetterSupabaseData( client )
			},
			inject    : [ SupabaseClient<Database> ]
		},
		AddNewsLetterService, RemoveNewsLetterService, CheckNewsLetterService,
		GetAllNewsLetterService ]
} )
export class NewsLettersModule {}
