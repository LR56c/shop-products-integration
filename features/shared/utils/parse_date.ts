export const dateToUTC = (date : Date) : string => {
  return date.toJSON()
}

export const dateFromUTC = (date : string | number) : Date => {
	return new Date(date)
}
