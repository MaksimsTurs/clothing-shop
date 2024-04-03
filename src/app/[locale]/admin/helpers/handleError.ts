import type { ServerResError } from "@/lib/fetcher/fetcher.type";

type Errors = 'NOT_FOUND'

export default function handleError(when: boolean, errorKey: Errors, errorCase?: string): ServerResError | undefined {
  if(!when) return undefined

  switch(errorKey) {
    case 'NOT_FOUND':
      return { code: 404, message: errorCase || 'Resource not founded!' }
  }
}