export default function parseJSONError(error: string): { code: number, message: string } {
  const parsedError = (JSON.parse(error) as { code: number, message: string })
  return parsedError
}