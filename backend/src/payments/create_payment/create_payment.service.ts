import { Injectable } from '@nestjs/common';
import {PaymentRepository} from "~features/payments/domain/repository/payment_repository";
import {Payment} from "~features/payments/domain/models/payment";

@Injectable()
export class CreatePaymentService {
    constructor(private repository: PaymentRepository) {}
    async createPayment(payment: Payment): Promise<boolean> {
        return this.repository.createPayment(payment);
    }
}
