import { Module } from '@nestjs/common';
import { DeletePaymentService } from './delete_payment.service';
import { DeletePaymentController } from './delete_payment.controller';

@Module({
  controllers: [DeletePaymentController],
  providers: [DeletePaymentService],
})
export class DeletePaymentModule {}
