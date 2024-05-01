import { Injectable } from '@nestjs/common';
import { Role } from '~features/shared/domain/value_objects/Role'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import {UserDao} from "~features/user/domain/dao/UserDao";
import {User} from "~features/user/domain/models/User";

@Injectable()
export class GetUserService {
    constructor (private repository: UserDao) {}
    async getUser(from: ValidInteger, to: ValidInteger, role?: Role, name?: ValidString): Promise<User[]> {
        return this.repository.getUser(from,to, role,name)
    }
}
