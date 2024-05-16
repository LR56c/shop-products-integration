import {UserDao} from "../domain/dao/UserDao";
import {wrapType} from "../../shared/utils/WrapType";
import {UUID} from "../../shared/domain/value_objects/UUID";
import {InvalidUUIDException} from "../../shared/domain/exceptions/InvalidUUIDException";
import {BaseException} from "../../shared/domain/exceptions/BaseException";

export const DeleteUser = async (
    repo: UserDao,
    authId: string): Promise<boolean> => {

    const idResult = wrapType<UUID, InvalidUUIDException>(
        () => UUID.from(authId))

    if (idResult instanceof BaseException) {
        throw [new InvalidUUIDException('authId')]
    }

    return repo.deleteUser(idResult)
}