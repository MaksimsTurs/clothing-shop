import type { ServerResError } from "../fetcher/fetcher.type"

export default function parseJSONError(error: string): ServerResError {
  const parsedError = (JSON.parse(error) as ServerResError)
  return parsedError
}