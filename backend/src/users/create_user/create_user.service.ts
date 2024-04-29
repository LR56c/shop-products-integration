import { Injectable } from '@nestjs/common';
import {UserDao} from "~features/user/domain/dao/UserDao";
import {CreateUser} from "~features/user/application/creat_user";

@Injectable()
export class CreateUserService {
    constructor(private repository: UserDao) {}
    async createUser(props: {
        rut: string;
        name: string;
        email: string;
        role: string;
    }): Promise<boolean> {
        return CreateUser(this.repository,{
            rut: props.rut,
            name: props.name,
            email: props.email,
            role: props.role
        });
    }
}
