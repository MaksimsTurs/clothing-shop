import type { ErrorPageProps } from "@/global.type";

export default function Error({ error }: ErrorPageProps) {
  const { message, code } = error
	return <p className='error_message_container'>{message}{code ? ` - ${code}` : null}</p>
}