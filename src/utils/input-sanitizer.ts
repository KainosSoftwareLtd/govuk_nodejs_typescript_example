import { escape, trim } from 'validator'

export function sanitizeInputString(inputString: string) {
    let sanitizedInput = inputString || ''
    sanitizedInput = trim(sanitizedInput)
    sanitizedInput = escape(sanitizedInput)

    return sanitizedInput
}
