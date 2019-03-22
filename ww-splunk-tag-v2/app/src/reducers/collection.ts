export const initialState = {
    fetching: false,
    fetched: false,
    errors: [],
    data: []
}

export default (state: any = initialState, action: any) => {
    switch(action.type) {
        case 'collection/CREATE_FULFILLED':
            return {
                ...state,
                data: [ action.payload.data, ...state.data ]
            }
        case 'collection/UPDATE_FULFILLED':
            return {
                ...state,
                data: state.data.map((index: any) => {
                    return index.id === action.payload.data.id ? {
                        ...action.payload.data
                    } : index
                })
            }
        case 'collection/DELETE_FULFILLED':
            return {
                ...state,
                data: state.data
            } 
        case 'collection/INITIALIZATION_COMPLETE':
            return {
                ...state,
                data: action.payload
            }
        default:
            return state
    }
}