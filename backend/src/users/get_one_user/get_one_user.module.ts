import { Module } from '@nestjs/common';
import { GetOneUserService } from './get_one_user.service';
import { GetOneUserController } from './get_one_user.controller';

@Module({
  controllers: [GetOneUserController],
  providers: [GetOneUserService],
})
export class GetOneUserModule {}
