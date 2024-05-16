import { Injectable } from '@nestjs/common';
import { Role } from '~features/shared/domain/value_objects/Role'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import {UserDao} from "~features/user/domain/dao/UserDao";
import {User} from "~features/user/domain/models/User";
import {GetProduct} from "~features/products/application/get_product";
import {GetUser} from "~features/user/application/get_user";

@Injectable()
export class GetUserService {
    constructor (private repository: UserDao) {}
    async getUser(from: number, to: number , role?: string, name?: string): Promise<User[]> {
        return GetUser(this.repository, { from, to, role, name })
    }
}
