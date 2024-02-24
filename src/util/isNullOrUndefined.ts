export default function isNullOrUndefined(what: any) {
  if(what === 'undefined' || what === 'null' || !what) return true
  return false
}