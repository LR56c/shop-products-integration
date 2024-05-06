import { Module } from '@nestjs/common';
import { GetPaymentService } from './get_payment.service';
import { GetPaymentController } from './get_payment.controller';

@Module({
  controllers: [GetPaymentController],
  providers: [GetPaymentService],
})
export class GetPaymentModule {}
