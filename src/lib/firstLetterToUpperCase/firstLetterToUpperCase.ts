function firstLetterToUpperCase(str: string) {
  if(str.split(/[A-Z]/).length <= 1) return `${str.at(0)?.toUpperCase()}${str.slice(1, str.length)}`

  let label: string = ''
  const labelLength: number = str.split(/[A-Z]/)[0].length
	const charAt: string = str.charAt(labelLength)

	if (charAt.length > 0) {
		label = `${str.split(/[A-Z]/)[0]} ${charAt}${str.split(/[A-Z]/)[1]}`
	} else {
		label = str
	}

	return label
}

export default firstLetterToUpperCase