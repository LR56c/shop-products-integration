import {User} from "../models/User";
import {Role} from "../../../shared/domain/value_objects/Role";
import {ValidString} from "../../../shared/domain/value_objects/ValidString";
import {ValidInteger} from "../../../shared/domain/value_objects/ValidInteger";
import {Email} from "../../../shared/domain/value_objects/Email";

export abstract class UserDao {
    abstract createUser(user: User): Promise<boolean>
    abstract getUser(from: ValidInteger, to: ValidInteger, role?: Role, name?: ValidString): Promise<User[]>
    abstract updateUser(email: Email, user : User ): Promise<boolean>
    abstract deleteUser(email: Email): Promise<boolean>
}
