import { compare } from 'fast-json-patch'

const initialState = {
    visible: true,
    selected: {},
    backup: {},
    patch: [],
}

export default (state=initialState, action: any) => {
    switch(action.type) {
        case 'detailsModal/SHOW':
            return {
                ...state,
                visible: true
            }
        case 'detailsModal/HIDE':
            return {
                ...state,
                visible: false
            }
        case 'detailsModal/CHANGE_SELECTED':
            return {
                ...state,
                selected: action.payload
            }
        case 'detailsModal/LOAD_BACKUP':
            return {
                ...state,
                backup: action.payload
            }
        case 'detailsModal/CHANGE_FORM_DATA':
            const { field, value } = action.payload
            const newSelected = { ...state.selected, [field]: value}
            return {
                ...state,
                selected: newSelected,
                patch: compare(state.selected, newSelected)
            }
        default:
            return state
    }
}