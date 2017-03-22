import { GET_JOBS, CREATE_JOB, UPDATE_JOB, DELETE_JOB } from '../actions/jobs'

export function getJobsReducer(state = [], action) {
    switch (action.type) {
        case GET_JOBS:
            return [ action.payload.data, ...state ];
    }
    return state;
}

export function createJobReducer(state = [], action) {
    switch (action.type) {
        case CREATE_JOB:
            return [ action.payload.data, ...state ];
    }
    return state;
}

export function updateJobReducer(state = [], action) {
    switch (action.type) {
        case UPDATE_JOB:
            return [ action.payload.data, ...state ];
    }
    return state;
}

export function deleteJobReducer(state = [], action) {
    switch (action.type) {
        case DELETE_JOB:
            return [ action.payload.data, ...state ];
    }
    return state;
}
