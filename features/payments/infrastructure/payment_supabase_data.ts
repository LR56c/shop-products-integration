import {PaymentRepository} from "../domain/repository/payment_repository";
import {SupabaseClient} from "@supabase/supabase-js";
import {Database} from "backend/database.types";
import {paymentToJson} from "../application/payment_mapper";
import {Payment} from "../domain/models/payment";
import {InfrastructureException} from "../../shared/infrastructure/infrastructure_exception";
import {UUID} from "../../shared/domain/value_objects/UUID";

export class PaymentSupabaseData implements PaymentRepository {
    constructor( private readonly payment: SupabaseClient<Database>) {}

    readonly tableName = 'payments'

    async createPayment(payment: Payment): Promise<boolean> {
        try {
            await this.payment.from(this.tableName).insert(paymentToJson(payment) as any)
            return true
        } catch (e) {
            throw new InfrastructureException()
        }
    }
    async getPayment(id: UUID): Promise<Payment[]> {
        try {
            const result = this.payment.from(this.tableName).select().eq('id', id.value)

            if (id !== undefined) {
                result.eq('id', id.value)
            }
        }
    }
}