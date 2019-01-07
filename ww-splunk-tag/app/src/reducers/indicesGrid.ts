import { newIndexTemplate } from '../types'

const initialState: any = {
    selected: {},
    data: [],
    createMode: false
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
                selected: newIndexTemplate,
                createMode: true,
            }
        case 'detailsModal/CANCEL_CHANGES':
            const newData = [...state.data]
            newData.shift()
            return state.createMode ? {
                ...state,  
                data: newData
            } :
            state
        case 'collection/CREATE_FULFILLED':
            return {
                ...state,
                createMode: false
            }
        default:
            return state;
    }
}