import { Injectable } from '@nestjs/common';
import {PaymentRepository} from "~features/payments/domain/repository/payment_repository";
import {Payment} from "~features/payments/domain/models/payment";

@Injectable()
export class UpdatePaymentService {
    constructor(private repository: PaymentRepository) {}
    async updatePayment(payment: Payment): Promise<boolean> {
        return this.repository.updatePayment(payment);
    }
}
