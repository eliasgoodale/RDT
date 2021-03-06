import { newIndexTemplate } from '../types'

const initialState: any = {
    selected: {},
    data: [],
    createMode: false,
    sort: [{field: 'index', dir: 'asc'}]
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
        case 'indicesGrid/CHANGE_SORT':
            return {
                ...state,
                sort: action.payload
            }
        case 'detailsModal/CANCEL_CHANGES':
            const newData = [...state.data]
            if (state.createMode === true) { 
                newData.shift()
            }
            return {
                ...state,
                selected: initialState.selected, 
                createMode: false,
                data: newData
            } 
        case 'collection/CREATE_FULFILLED':
            return {
                ...state,
                createMode: false
            }
        default:
            return state;
    }
}