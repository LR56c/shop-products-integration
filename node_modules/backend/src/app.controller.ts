import {
	Controller,
	Get
} from '@nestjs/common'
import { Email } from '~features/shared/domain/value_objects/Email'
import { AppService } from './app.service'

@Controller()
export class AppController {
	constructor( private readonly appService: AppService ) {}

	@Get()
	getHello(): string {
		const e = Email.from("abc@gmail.com")
		console.log(e)
		const a = Email.from("12312")
		console.log(a)
		return this.appService.getHello()
	}
}
