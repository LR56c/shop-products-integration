import { Injectable } from '@nestjs/common';
import {PaymentRepository} from "~features/payments/domain/repository/payment_repository";
import {ValidInteger} from "~features/shared/domain/value_objects/ValidInteger";
import {ValidBool} from "~features/shared/domain/value_objects/ValidBool";
import {ValidDate} from "~features/shared/domain/value_objects/ValidDate";
import {Payment} from "~features/payments/domain/models/payment";

@Injectable()
export class GetAllPaymentService {
    constructor(private repository: PaymentRepository) {}
    async getAll(from: ValidInteger, to: ValidInteger, approved?: ValidBool, from_date?: ValidDate,
                 to_date?: ValidDate): Promise<Payment[]> {
        return this.repository.getAllPayment(from, to, approved, from_date, to_date);
    }
}
