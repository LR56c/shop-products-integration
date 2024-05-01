import { Injectable } from '@nestjs/common';
import {UserDao} from "~features/user/domain/dao/UserDao";
import { User } from '~features/user/domain/models/User'

@Injectable()
export class CreateUserService {
    constructor(private repository: UserDao) {}
    async createUser(user : User): Promise<boolean> {
        return this.repository.createUser(user);
    }
}
