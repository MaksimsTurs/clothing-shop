export default function isNullOrUndefined(what: any): boolean {
  if(what === 'undefined' || what === 'null' || !what) return true
  return false
}