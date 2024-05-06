import { Injectable } from '@nestjs/common';
import {PaymentRepository} from "~features/payments/domain/repository/payment_repository";
import {UUID} from "~features/shared/domain/value_objects/UUID";

@Injectable()
export class DeletePaymentService {
    constructor(private repository: PaymentRepository) {}
    async deletePayment(id: UUID): Promise<boolean> {
        return this.repository.deletePayment(id);
    }
}
