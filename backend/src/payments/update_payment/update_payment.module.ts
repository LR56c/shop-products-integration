import { Module } from '@nestjs/common';
import { UpdatePaymentService } from './update_payment.service';
import { UpdatePaymentController } from './update_payment.controller';

@Module({
  controllers: [UpdatePaymentController],
  providers: [UpdatePaymentService],
})
export class UpdatePaymentModule {}
