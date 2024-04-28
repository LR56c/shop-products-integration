import {
  forwardRef,
  Module
} from '@nestjs/common'
import { AppModule } from 'src/app.module'
import { AddRankController } from 'src/ranks/add-rank/add-rank.controller'
import { AddRankService } from 'src/ranks/add-rank/add-rank.service'
import { AverageRankController } from 'src/ranks/average-rank/average-rank.controller'
import { AverageRankService } from 'src/ranks/average-rank/average-rank.service'
import { GetAllRankByCodeController } from 'src/ranks/get-all-rank-by-code/get-all-rank-by-code.controller'
import { GetAllRankByCodeService } from 'src/ranks/get-all-rank-by-code/get-all-rank-by-code.service'

@Module({
  controllers: [AddRankController, GetAllRankByCodeController, AverageRankController],
  imports: [
    forwardRef( () => AppModule )
  ],
  providers: [AddRankService, GetAllRankByCodeService, AverageRankService],
})
export class RanksModule {}
