import { Module } from '@nestjs/common';
import { CreatePaymentService } from './create_payment.service';
import { CreatePaymentController } from './create_payment.controller';

@Module({
  controllers: [CreatePaymentController],
  providers: [CreatePaymentService],
})
export class CreatePaymentModule {}
