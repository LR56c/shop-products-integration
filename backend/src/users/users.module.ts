import {
	forwardRef,
	Module
} from '@nestjs/common'
import { AppModule } from '../app.module'
import { GetOneUserController } from './get_one_user/get_one_user.controller'
import { GetOneUserService } from './get_one_user/get_one_user.service'
import { GetUserController } from './get_user/get_user.controller'
import { GetUserService } from './get_user/get_user.service'
import { UpdateUserController } from './update_user/update_user.controller'
import { UpdateUserService } from './update_user/update_user.service'

@Module( {
	controllers: [
		UpdateUserController, GetUserController,
		GetOneUserController
	],
	providers  : [
		GetUserService, UpdateUserService, GetOneUserService
	],
	imports    : [
		forwardRef( () => AppModule )
	]
} )
export class UsersModule {}
