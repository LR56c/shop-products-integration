import { ValidationError } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
	DocumentBuilder,
	SwaggerModule
} from '@nestjs/swagger'
import { useContainer } from 'class-validator'
import {
	I18nValidationExceptionFilter,
	I18nValidationPipe
} from 'nestjs-i18n'
import { Password } from '~features/user/domain/models/Password'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create( AppModule )
	const config   = new DocumentBuilder()
		.setTitle( 'Shop API' )
		.setVersion( '0.1' )
		.build()
	const document = SwaggerModule.createDocument( app, config )
	SwaggerModule.setup( 'api', app, document )

	app.useGlobalPipes( new I18nValidationPipe( {
		whitelist           : true,
		forbidNonWhitelisted: true,
		transform           : true,
		transformOptions    : {
			enableImplicitConversion: true
		}
	} ) )
	app.useGlobalFilters(
		new I18nValidationExceptionFilter( {
			errorFormatter: ( validationErrors ) => {
				return formatValidation( validationErrors )
			}
		} )
	)
	useContainer( app.select( AppModule ), { fallbackOnErrors: true } )

	app.useGlobalPipes(
		new I18nValidationPipe(),
	);

	const port = process.env.PORT || 3000
	await app.listen( port,() => {
		console.log( `Server running on http://localhost:${ port }` )
		console.log( `Swagger running on http://localhost:${ port }/api` )
	})
}

bootstrap()

function formatValidation( errors: ValidationError[],
	isArray: boolean = false ): object {
	const formattedErrors = {}

	for ( const error of errors ) {
		if ( error.children && error.children.length > 0 ) {
			isArray = !Number.isNaN( Number.parseInt( error.children[0].property ) )

			if ( isArray ) {
				//passengers.0.preferences.0
				//si es un array
				formattedErrors[error.property] = error.children.map( ( child ) =>
				// @ts-ignore
					formatValidation( child.children, isArray )
				)
			}
			else {
				//object
				formattedErrors[error.property] =
					formatValidation( error.children, isArray )
			}
		}

		if ( error.constraints && Object.keys( error.constraints ).length > 0 ) {
			//array string / string
			// formattedErrors[error.property] = Object.values( error.constraints )
			formattedErrors[error.property] = Object.values( error.constraints )
			                                        .join( ', ' )
		}
	}
	return formattedErrors
}

function parseValidation( json: Record<string, any> ): object {
	const result: any = {}

	for ( const key in json ) {
		if ( typeof json[key][0] === 'string' ) {
			// normal/string - array true  - child string
			result[key] = Array( json[key] )
				.join()
		}
		else {
			if ( Array.isArray( json[key] ) ) {
				// array-object  - array true - child object
				result[key] = json[key].map( ( child ) => {
					return parseValidation( child )
				} )
			}
			else {
				// obj/object    - array false - child undefined
				result[key] = parseValidation( json[key] )
			}
		}
	}
	return result
}
