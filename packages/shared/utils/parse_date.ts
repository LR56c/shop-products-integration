export const dateToUTC = ( date: Date ): string => {
	return date.toJSON()
}

export const dateFromUTC = ( dateUTC : Date ): Date => {
	return new Date(dateUTC.getTime() - dateUTC.getTimezoneOffset() * 60000);
}
