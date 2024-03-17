import type { ServerResError } from "../fetcher/fetcher.type"

export default function parseJSONError(error: any): ServerResError {
  if('message' in error) return (JSON.parse(error.message) as ServerResError)
  if(error.search('Error:')) return (JSON.parse(error.replace('Error:', '').trim()) as ServerResError)
  return (JSON.parse(error) as ServerResError)
}