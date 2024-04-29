import { Controller } from '@nestjs/common';
import { PaymentMethodsService } from './payment_methods.service';

@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}
}
