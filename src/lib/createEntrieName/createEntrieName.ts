export default function createEntrieName(string: string) {
  let splitedString: string[] = string.split(/[A-Z]/)
  let uppercaseLetter: string = string.charAt(splitedString[0].length)

  if(uppercaseLetter) return `${splitedString[0]} ${uppercaseLetter}${splitedString[1]}`
  
  return splitedString[0]
}