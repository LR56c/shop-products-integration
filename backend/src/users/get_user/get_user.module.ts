import { Module } from '@nestjs/common';
import { GetUserService } from './get_user.service';
import { GetUserController } from './get_user.controller';

@Module({
  controllers: [GetUserController],
  providers: [GetUserService],
})
export class GetUserModule {}
