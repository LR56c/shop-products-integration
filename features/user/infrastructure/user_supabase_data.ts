import {UserDao} from "../domain/dao/UserDao";
import {SupabaseClient} from "@supabase/supabase-js";
import {Database} from "backend/database.types";
import {InfrastructureException} from "../../shared/infrastructure/infrastructure_exception";
import {Role} from "../../shared/domain/value_objects/Role";
import {ValidString} from "../../shared/domain/value_objects/ValidString";
import {ValidInteger} from "../../shared/domain/value_objects/ValidInteger";
import {User} from "../domain/models/User";
import {userFromJson, userToJson} from "../application/user_mapper";
import {BaseException} from "../../shared/domain/exceptions/BaseException";

export class UserSupaBaseData implements UserDao {
    constructor(private readonly client: SupabaseClient<Database>) {}

    readonly tableName = 'users'

    async getUser(role: Role, name: ValidString, from: ValidInteger, to: ValidInteger): Promise<User[]> {
        const result = await this.client.from(this.tableName)
            .select()
            .eq('role', role)
            .eq('name', name)
            .range(from.value, to.value)

        if (result.error) {
            throw [new InfrastructureException()]
        }

        const users: User[] = []
        for (const json of result.data) {
            const user = userFromJson(json)
            if (user instanceof BaseException) {
                throw [user]
            }
            users.push(user as User)
        }
        return users
    }
    async updateUser(email: ValidString, user: User): Promise<boolean> {
        try {
            await this.client.from(this.tableName)
                .update(userToJson(user) as any)
                .eq('email', email)
            return true
        } catch (e) {
            throw [new InfrastructureException()]
        }
    }
    async deleteUser(email: ValidString): Promise<boolean> {
        try {
            await this.client.from(this.tableName)
                .delete()
                .eq('email', email)
            return true
        } catch (e) {
            throw [new InfrastructureException()]
        }
    }
    async createUser(user: User): Promise<boolean> {
        try {
            await this.client.from(this.tableName)
                .insert(userToJson(user) as any)
            return true
        } catch (e) {
            throw [new InfrastructureException()]
        }
    }
}