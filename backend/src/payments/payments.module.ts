import { PaymentSupabaseData } from '~features/payments/infrastructure/payment_supabase_data'
import {CreatePaymentController} from "./create_payment/create_payment.controller";
import {DeletePaymentController} from "./delete_payment/delete_payment.controller";
import {GetPaymentController} from "./get_payment/get_payment.controller";
import {UpdatePaymentController} from "./update_payment/update_payment.controller";
import {PaymentRepository} from "~features/payments/domain/repository/payment_repository";
import {SupabaseClient} from "@supabase/supabase-js";
import {Database} from "../../database.types";
import {forwardRef, Module} from "@nestjs/common";
import {CreatePaymentService} from "./create_payment/create_payment.service";
import {DeletePaymentService} from "./delete_payment/delete_payment.service";
import {GetPaymentService} from "./get_payment/get_payment.service";
import {UpdatePaymentService} from "./update_payment/update_payment.service";
import {AppModule} from "../app.module";
import { GetAllPaymentModule } from './get_all_payment/get_all_payment.module';
import {GetAllPaymentController} from "./get_all_payment/get_all_payment.controller";
import {GetAllPaymentService} from "./get_all_payment/get_all_payment.service";

@Module({
    controllers: [
        CreatePaymentController, DeletePaymentController,
        GetPaymentController, UpdatePaymentController,
        GetAllPaymentController
    ],
    providers: [{
        provide: PaymentRepository,
        useFactory: (client: SupabaseClient<Database>) => {
            return new PaymentSupabaseData(client)
        },
        inject: [SupabaseClient<Database>]
    },
        CreatePaymentService, DeletePaymentService,
        GetPaymentService, UpdatePaymentService,
        GetAllPaymentService
    ],
    imports: [
        forwardRef(() => AppModule),
    ],
})
export class PaymentsModule {}
