import { Module } from '@nestjs/common';
import { GetAllPaymentService } from './get_all_payment.service';
import { GetAllPaymentController } from './get_all_payment.controller';

@Module({
  controllers: [GetAllPaymentController],
  providers: [GetAllPaymentService],
})
export class GetAllPaymentModule {}
