import { GET_SETTINGS, UPDATE_SETTING } from '../actions/settings'

export function getStateSettings(state = [], action) {
    switch (action.type) {
        case GET_SETTINGS:
            return [ action.payload.data, ...state ];
    }
    return state;
}

export function updateStateSetting(state = [], action) {
    switch (action.type) {
        case UPDATE_SETTING:
            return [ action.payload.data, ...state ];
    }
    return state;
}
