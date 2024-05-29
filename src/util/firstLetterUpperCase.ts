export default function firstLetterUpperCase(str: string | string[]): string | string[] {
  if(Array.isArray(str)) return str.map(string => `${string[0].toUpperCase()}${string.replace(string[0], '').toLowerCase()}`)
  return `${str[0].toUpperCase()}${str.replace(str[0], '').toLowerCase()}`
}