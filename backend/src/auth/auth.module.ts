import {
  forwardRef,
  Module
} from '@nestjs/common'
import { AppModule } from 'src/app.module'
import { LoginAuthController } from './login-auth/login-auth.controller'
import { LoginAuthService } from './login-auth/login-auth.service'

@Module({
  controllers: [LoginAuthController],
  providers: [LoginAuthService],
  imports: [
    forwardRef( () => AppModule )
  ],
})
export class AuthModule {}
