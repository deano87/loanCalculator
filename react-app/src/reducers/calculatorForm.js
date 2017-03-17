export function calculatorFormJobTypes(state = [], action) {
    switch (action.type) {
        case 'FETCH_CALC_FORM_JOB_TYPES':
            return [ action.payload.data, ...state ];
    }
    return state;
}
