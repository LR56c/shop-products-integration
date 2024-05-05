import {PaymentRepository} from "../domain/repository/payment_repository";
import {SupabaseClient} from "@supabase/supabase-js";
import {Database} from "backend/database.types";
import {paymentFromJson, paymentToJson} from "../application/payment_mapper";
import {Payment} from "../domain/models/payment";
import {InfrastructureException} from "../../shared/infrastructure/infrastructure_exception";
import {UUID} from "../../shared/domain/value_objects/UUID";
import {BaseException} from "../../shared/domain/exceptions/BaseException";
import {ValidInteger} from "../../shared/domain/value_objects/ValidInteger";
import {ValidBoolean} from "../../shared/domain/value_objects/ValidBoolean";
import {ValidDate} from "../../shared/domain/value_objects/ValidDate";
import {LimitIsNotInRange} from "../../shared/infrastructure/limit_is_not_in_range";
import {ParameterNotMatchException} from "../../shared/infrastructure/parameter_not_match_exception";

export class PaymentSupabaseData implements PaymentRepository {
    constructor( private readonly client: SupabaseClient<Database>) {}

    readonly tableName = 'payments'

    async createPayment(payment: Payment): Promise<boolean> {
        try {
            await this.client.from(this.tableName).insert(paymentToJson(payment) as any)
            return true
        } catch (e) {
            throw new InfrastructureException()
        }
    }
    async getPayment(id: UUID): Promise<Payment> {
            const result = await this.client.from(this.tableName)
                .select()
                .eq('id', id.value)
            if (result.error) {
                throw [new InfrastructureException()]
            }
            const payment = paymentFromJson(result.data[0])
            if (payment instanceof BaseException){
                throw payment
            }
            return payment as Payment
    }
    async getAllPayment(from: ValidInteger, to: ValidInteger, approved?: ValidBoolean,
                        from_date?: ValidDate, to_date?: ValidDate): Promise<Payment[]> {
        try {
            const result = this.client.from(this.tableName)
                .select()
            if (approved !== undefined) {
                result.eq('approved', approved?.value)
            }
            if (from_date !== undefined && to_date !== undefined) {
                result.lte('date', from_date.value)
                result.gte('date', to_date.value)
            }
            const {data, error} = await result.range(from.value, to.value)
            if (error) {
                if (error.code === '22P02') {
                    throw [new ParameterNotMatchException()]
                }
                throw [new InfrastructureException()]
            }
            const payments: Payment[] = []
            for (const json of data) {
                const payment = paymentFromJson(json)
                if (payment instanceof BaseException) {
                    throw [payment]
                }
                payments.push(payment as Payment)
            }
            return payments
        } catch (e) {
            throw [new InfrastructureException()]
        }

    }
    async updatePayment(payment: Payment): Promise<boolean> {
        try {
            const result = await this.client.from(this.tableName)
                .update(paymentToJson(payment) as any)
                .eq('id', payment.id.value)
            return true
        } catch (e) {
            throw new InfrastructureException()
        }
    }
    async deletePayment(id: UUID): Promise<boolean> {
        try {
            await this.client.from(this.tableName)
                .delete()
                .eq('id', id.value)
            return true
        } catch (e) {
            throw new InfrastructureException()
        }
    }
}