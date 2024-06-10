import {
	forwardRef,
	Module
} from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'
import { RankRepository } from '../../packages/ranks/domain/rank_repository'
import { RankSupabaseData } from '../../packages/ranks/infrastructure/rank_supabase_data'
import { AppModule } from '../app.module'
import { AddRankController } from './add-rank/add-rank.controller'
import { AddRankService } from './add-rank/add-rank.service'
import { AverageRankController } from './average-rank/average-rank.controller'
import { AverageRankService } from './average-rank/average-rank.service'
import { GetAllRankByCodeController } from './get-all-rank-by-code/get-all-rank-by-code.controller'
import { GetAllRankByCodeService } from './get-all-rank-by-code/get-all-rank-by-code.service'
import { UpdateRankController } from './update-rank/update-rank.controller'
import { UpdateRankService } from './update-rank/update-rank.service'

@Module( {
	controllers: [ AddRankController, GetAllRankByCodeController,
		UpdateRankController,
		AverageRankController ],
	imports    : [
		forwardRef( () => AppModule )
	],
	providers  : [
		{
			provide   : RankRepository,
			useFactory: ( client: SupabaseClient<Database> ) => {
				return new RankSupabaseData( client )
			},
			inject    : [ SupabaseClient<Database> ]
		},
		AddRankService, GetAllRankByCodeService, AverageRankService,
		UpdateRankService ]
} )
export class RanksModule {}
