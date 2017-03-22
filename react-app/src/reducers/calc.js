import { CALC_GET_SETTINGS } from '../actions/calc'

export function calcSettings(state = [], action) {
    switch (action.type) {
        case CALC_GET_SETTINGS:
            return [ action.payload.data, ...state ];
    }
    return state;
}

export function calcResults(state = [], action) {
    switch (action.type) {
        case CALC_RESULTS:
            return [ action.payload.data, ...state ];
    }
    return state;
}
