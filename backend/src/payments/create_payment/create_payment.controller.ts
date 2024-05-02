import { Controller } from '@nestjs/common';
import { CreatePaymentService } from './create_payment.service';

@Controller('create-payment')
export class CreatePaymentController {
  constructor(private readonly createPaymentService: CreatePaymentService) {}
}
