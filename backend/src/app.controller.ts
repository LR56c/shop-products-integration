import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Res,
	Response,
	UsePipes
} from '@nestjs/common'
import { ZodValidationPipe } from 'src/shared/pipes/ZodValidationPipe'
import { z } from 'zod'
import { Email } from '~features/shared/domain/value_objects/Email'
import { HttpResultData } from '~features/shared/utils/HttpResultData'
import { AppService } from './app.service'

export const createCatSchema = z
	.object({
		name: z.string(),
		age: z.number(),
		breed: z.string(),
	})
	.required();

export type CreateCatDto = z.infer<typeof createCatSchema>;

@Controller()
export class AppController {
	constructor( private readonly appService: AppService ) {}

	@Get()
	getHello(): string {
		const e = Email.from("abc@gmail.com")
		console.log(e)
		return this.appService.getHello()
	}

	@Post()
	@UsePipes(new ZodValidationPipe(createCatSchema))
	create( @Body() cat : CreateCatDto): HttpResultData<string> {
		console.log(cat)
		return {
			statusCode: HttpStatus.OK,
			data: "cat created"
		}
	}
}

