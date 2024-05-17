import { Injectable } from '@nestjs/common';
import {UserDao} from "~features/user/domain/dao/UserDao";
import {DeleteUser} from "~features/user/application/delete_user";

@Injectable()
export class DeleteUserService {
    constructor( private repository: UserDao ) {
    }
    async deleteUser(email: string): Promise<boolean> {
        return DeleteUser( this.repository, email  )
    }
}
