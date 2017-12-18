import { CODE_CHANGED } from './types';

export const codeChanged = (code) => {
    return {
        type: CODE_CHANGED,
        payload: code
    }
}