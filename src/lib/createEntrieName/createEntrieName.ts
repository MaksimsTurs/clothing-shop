import firstLetterToUpperCase from "../firstLetterToUpperCase/firstLetterToUpperCase"

export default function createEntrieName(string: string) {
  let splitedString = string.split(/[A-Z]/)
  let uppercaseLetter = string.charAt(splitedString[0].length)

  if(uppercaseLetter) {
    return `${firstLetterToUpperCase(splitedString[0])} ${uppercaseLetter}${splitedString[1]}`
  } else {
    return firstLetterToUpperCase(splitedString[0])
  }
}