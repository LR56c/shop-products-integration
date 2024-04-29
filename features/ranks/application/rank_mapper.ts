import { Rank } from '../domain/rank'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidRankException } from '../../shared/domain/exceptions/InvalidRankException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'
import { ValidRank } from '../../shared/domain/value_objects/ValidRank'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { wrapType } from '../../shared/utils/WrapType'

export function rankToJson( rank: Rank ): Record<string, any> {
	return {
		id        : rank.id.value,
		created_at: rank.createdAt.value,
		value     : rank.value.value,
		code      : rank.code.value
	}
}

export function rankFromJson( rank: Record<string, any> ): Rank | BaseException[] {
	const errors: BaseException[] = []

	const id = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( rank.id ) )

	if ( id instanceof BaseException ) {
		errors.push( new InvalidUUIDException() )
	}

	const createdAt = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( rank.created_at ) )

	if ( createdAt instanceof BaseException ) {
		errors.push( new InvalidDateException('created_at') )
	}

	const value = wrapType<ValidRank, InvalidRankException>(
		() => ValidRank.from( rank.value ) )

	if ( value instanceof BaseException ) {
		errors.push( new InvalidRankException() )
	}

	const code = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( rank.code ) )

	if ( code instanceof BaseException ) {
		errors.push( new InvalidStringException('code') )
	}

	if ( errors.length > 0 ) {
		return errors
	}

	return new Rank(
		id as UUID,
		createdAt as ValidDate,
		value as ValidRank,
		code as ValidString
	)
}
