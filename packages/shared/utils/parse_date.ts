export const dateToUTC = ( date: Date ): string => {
	return date.toJSON()
}

export const dateFromUTC = ( dateUTC: Date ): Date => {
	return new Date( dateUTC.getTime() - dateUTC.getTimezoneOffset() * 60000 )
}

export const getStartAndEndOfMonth = ( date: Date ): {
	start: Date,
	end: Date
} => {
	return {
		start: new Date( date.getFullYear(), date.getMonth(), 1 ),
		end  : new Date( date.getFullYear(), date.getMonth() + 1, 0 )
	}
}

// const locales = Intl.getCanonicalLocales()

export const getMonthName = ( date: Date ): string => {
	const formatter = new Intl.DateTimeFormat( 'en-US', {
		month: 'long'
	} )
	return toCapitalize( formatter.format( date ) )
}

export const toCapitalize = ( value: string ): string => {
	return value.charAt( 0 )
	            .toUpperCase() + value.slice( 1 )
}
