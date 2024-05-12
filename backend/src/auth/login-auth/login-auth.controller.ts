import {
  Controller,
  Post
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { LoginAuthService } from './login-auth.service';

@ApiTags( 'auth' )
@Controller( 'auth' )
export class LoginAuthController {
  constructor(private readonly loginAuthService: LoginAuthService) {}

  @Post()
  async login() {
    return true
  }
}
