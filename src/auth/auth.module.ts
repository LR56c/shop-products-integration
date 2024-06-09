import {
	forwardRef,
	Module
} from '@nestjs/common'
import { DeleteAuthController } from './delete-auth/delete-auth.controller'
import { DeleteAuthService } from './delete-auth/delete-auth.service'
import { AppModule } from '../app.module'
import { LoginAuthController } from './login-auth/login-auth.controller'
import { LoginAuthService } from './login-auth/login-auth.service'
import { RefreshAuthController } from './refresh-auth/refresh-auth.controller'
import { RefreshAuthService } from './refresh-auth/refresh-auth.service'
import { RegisterAuthController } from './register-auth/register-auth.controller'
import { RegisterAuthService } from './register-auth/register-auth.service'

@Module( {
	controllers: [ LoginAuthController, RegisterAuthController, DeleteAuthController,
		RefreshAuthController ],
	providers  : [ LoginAuthService, RegisterAuthService, RefreshAuthService, DeleteAuthService ],
	imports    : [
		forwardRef( () => AppModule ),
	]
} )
export class AuthModule {}
