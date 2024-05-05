import {Controller, Post} from '@nestjs/common';
import { CreatePaymentService } from './create_payment.service';
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {TranslationService} from "../../shared/services/translation/translation.service";

@ApiTags('payments')
@Controller('payments')
export class CreatePaymentController {
  constructor(private readonly createPaymentService: CreatePaymentService,
              private readonly translationService: TranslationService) {}
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        payment: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'AAAAA-AAAAA-AAAAA-AAAAA'
            },
            creationDate: {
              type: 'string',
              example: '2021-09-01'
            },
            approved: {
              type: 'boolean',
              example: true
            },
            deliveryName: {
              type: 'string',
              example: 'John Doe'
            },
            paymentValue: {
              type: 'number',
              example: 100000
            },
            paymentMethod: {
              type: 'string',
              example: 'CREDIT_CARD'
            }
          }
        }
      }
    }
  })
}
