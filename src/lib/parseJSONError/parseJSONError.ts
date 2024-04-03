import type { ServerResError } from "../fetcher/fetcher.type"

export default function parseJSONError(error: any): ServerResError {
  if(!error) return { code: 0, message: '' }
  if(typeof error === 'object' && 'message' in error) return (JSON.parse(error.message) as ServerResError)
  if(typeof error === 'string' && error.search('Error:')) return (JSON.parse(error.replace('Error:', '').trim()) as ServerResError)
  return (JSON.parse(error) as ServerResError)
}