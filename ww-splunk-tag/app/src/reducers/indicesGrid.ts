import { newIndexTemplate } from '../types'

const initialState: any = {
    selected: {},
    data: []
}

export default (state = initialState, action: any) => {
    switch(action.type) {
        case 'indicesGrid/CHANGE_SELECTED':
            return {
                ...state,
                selected: action.payload
            }
        case 'indicesGrid/IMPORT_DATA':
            return {
                ...state,
                data: action.payload
            }
        case 'indicesGrid/ENTER_CREATE':
            return {
                ...state,
                data: [newIndexTemplate, ...state.data],
                selected: newIndexTemplate
            }
        default:
            return state;
    }
}