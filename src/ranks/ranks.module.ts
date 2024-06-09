import {
	forwardRef,
	Module
} from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'
import { RankRepository } from 'packages/ranks/domain/rank_repository'
import { RankSupabaseData } from 'packages/ranks/infrastructure/rank_supabase_data'
import { AppModule } from 'src/app.module'
import { AddRankController } from 'src/ranks/add-rank/add-rank.controller'
import { AddRankService } from 'src/ranks/add-rank/add-rank.service'
import { AverageRankController } from 'src/ranks/average-rank/average-rank.controller'
import { AverageRankService } from 'src/ranks/average-rank/average-rank.service'
import { GetAllRankByCodeController } from 'src/ranks/get-all-rank-by-code/get-all-rank-by-code.controller'
import { GetAllRankByCodeService } from 'src/ranks/get-all-rank-by-code/get-all-rank-by-code.service'
import { UpdateRankController } from 'src/ranks/update-rank/update-rank.controller'
import { UpdateRankService } from 'src/ranks/update-rank/update-rank.service'

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