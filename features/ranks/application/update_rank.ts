import {wrapType} from "../../shared/utils/WrapType";
import {BaseException} from "../../shared/domain/exceptions/BaseException";
import {InvalidStringException} from "../../shared/domain/exceptions/InvalidStringException";
import {ValidString} from "../../shared/domain/value_objects/ValidString";
import {EmailException} from "../../shared/domain/exceptions/EmailException";
import {ValidRank} from "../../shared/domain/value_objects/ValidRank";
import {InvalidRankException} from "../../shared/domain/exceptions/InvalidRankException";
import {RankRepository} from "../domain/rank_repository";
import {Rank} from "../domain/rank";
import {Email} from "../../shared/domain/value_objects/Email";
import {ValidDate} from "../../shared/domain/value_objects/ValidDate";
import {InvalidDateException} from "../../shared/domain/exceptions/InvalidDateException";

export const UpdateRank = async (
    repo: RankRepository,
    props: {
        code?: string
        user_email?: string
        rank?: number
        created_at?: Date
    }): Promise <boolean> => {

    const errors: BaseException[] = []

    const codeResult = props.code === undefined
        ? undefined
        : wrapType<ValidString, InvalidStringException>(
            () => ValidString.from(props.code!))

    if (codeResult instanceof BaseException) {
        errors.push(new InvalidStringException('code'))
    }

    const userEmailResult = props.user_email === undefined
        ? undefined
        : wrapType<ValidString, InvalidStringException>(
            () => ValidString.from(props.user_email!))

    if (userEmailResult instanceof BaseException) {
        errors.push(new EmailException('user_email'))
    }

    const rankResult = props.rank === undefined
        ? undefined
        : wrapType<ValidRank, InvalidRankException>(
            () => ValidRank.from(props.rank!))

    if (rankResult instanceof BaseException) {
        errors.push(new InvalidRankException('rank'))
    }

    const dateResult = props.created_at === undefined
        ? undefined
        : wrapType<ValidDate, InvalidDateException>(
            () => ValidDate.from(props.created_at!))

    if (dateResult instanceof BaseException) {
        errors.push(new InvalidDateException('created_at'))
    }


    if (errors.length > 0) {
        throw errors
    }

    const newRank = new Rank(
        userEmailResult as Email,
        dateResult as ValidDate,
        rankResult as ValidRank,
        codeResult as ValidString,
    )
    await repo.updateRank(newRank)
    return true
}