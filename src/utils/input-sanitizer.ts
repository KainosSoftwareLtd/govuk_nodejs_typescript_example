import { escape, unescape, trim, whitelist, normalizeEmail } from 'validator'

const REGEX_LETTERS_AND_SPACE = 'a-zA-Z\" \"\''

export function lettersAndSpaceInputString(inputString: string) {
    if ( inputString ) {
        return whitelist(trim(inputString), REGEX_LETTERS_AND_SPACE)
    }
    return inputString
}

export function normalizeEmailInput(inputString: string) {
    if ( inputString ) {
        return normalizeEmail(inputString)
    }
    return inputString
}

export function escapeInputString(inputString: string) {
    if ( inputString ) {
        return escape(inputString)
    }
    return inputString
}

export function unescapeInputString(inputString: string) {
    if ( inputString ) {
        return unescape(inputString)
    }
    return inputString
}
