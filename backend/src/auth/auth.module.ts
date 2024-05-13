import {
  forwardRef,
  Module
} from '@nestjs/common'
import { AppModule } from '../app.module'
import { RefreshAuthController } from './refresh-auth/refresh-auth.controller'
import { RefreshAuthService } from './refresh-auth/refresh-auth.service'
import { RegisterAuthController } from './register-auth/register-auth.controller'
import { RegisterAuthService } from './register-auth/register-auth.service'
import { LoginAuthController } from './login-auth/login-auth.controller'
import { LoginAuthService } from './login-auth/login-auth.service'

@Module({
  controllers: [LoginAuthController, RegisterAuthController, RefreshAuthController],
  providers: [LoginAuthService, RegisterAuthService, RefreshAuthService],
  imports: [
    forwardRef( () => AppModule ),
  ],
})
export class AuthModule {}
