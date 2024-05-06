import {CreateUserController} from "./create_user/create_user.controller";
import {GetUserController} from "./get_user/get_user.controller";
import {DeleteUserController} from "./delete_user/delete_user.controller";
import {UpdateUserController} from "./update_user/update_user.controller";
import {CreateUserService} from "./create_user/create_user.service";
import {DeleteUserService} from "./delete_user/delete_user.service";
import {UpdateUserService} from "./update_user/update_user.service";
import {GetUserService} from "./get_user/get_user.service";
import {AppModule} from "../app.module";
import {UserSupaBaseData} from "~features/user/infrastructure/user_supabase_data";
import {SupabaseClient} from "@supabase/supabase-js";
import {Database} from "../../database.types";
import {UserDao} from "~features/user/domain/dao/UserDao";
import {forwardRef, Module} from "@nestjs/common";

@Module({
    controllers: [
        UpdateUserController, DeleteUserController, GetUserController, CreateUserController
    ],
    providers: [
        {
            provide: UserDao,
            useFactory: (client: SupabaseClient<Database>) => {
                return new UserSupaBaseData(client)
            },
            inject: [SupabaseClient<Database>]
        },
        GetUserService, UpdateUserService, DeleteUserService, CreateUserService
    ],
    imports: [
        forwardRef(() => AppModule)
    ]
})
export class UsersModule {}