import { CODE_CHANGED } from '../actions/types';

export default (state = '', action) => {
    switch (action.type) {
        case CODE_CHANGED:
            return action.payload;
        default:
            return state;
    }
}