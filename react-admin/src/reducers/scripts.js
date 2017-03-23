import { GET_SCRIPTS, RUN_SCRIPT } from '../actions/scripts'

export function getScriptsReducer(state = [], action) {
    switch (action.type) {
        case GET_SCRIPTS:
            return [ action.payload.data, ...state ];
    }
    return state;
}

export function runScriptReducer(state = [], action) {
    switch (action.type) {
        case RUN_SCRIPT:
            return [ action.payload.data, ...state ];
    }
    return state;
}
