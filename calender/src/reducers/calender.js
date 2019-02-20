import { merge } from 'ramda';

export default (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_DATE':
            return merge(state, action.payload);
        case 'CHANGE_MONTH':
            return merge(state, action.payload);
        default:
            return state
    }
}