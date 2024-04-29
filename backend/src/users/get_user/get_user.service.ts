import { Injectable } from '@nestjs/common';
import {UserDao} from "~features/user/domain/dao/UserDao";
import {GetUser} from "~features/user/application/get_user";
import {User} from "~features/user/domain/models/User";

@Injectable()
export class GetUserService {
    constructor (private repository: UserDao) {}
    async getUser(role: string, name: string, from: string, to: string): Promise<User[]> {
        return GetUser(this.repository, {
            role: role,
            name: name,
            from: from,
            to: to
        })
    }
}
