import { blacklist, escape, trim } from 'validator'

 // List based on http://stackoverflow.com/questions/1086918/what-characters-have-to-be-escaped-to-prevent-mysql-injections
const BLACKLIST = '<>&"\';/'

export function sanitizeInputString(inputString: string) {
    let sanitizedInput = inputString || ''
    sanitizedInput = blacklist(sanitizedInput, BLACKLIST)
    sanitizedInput = escape(sanitizedInput)
    sanitizedInput = trim(sanitizedInput)

    return sanitizedInput
}
