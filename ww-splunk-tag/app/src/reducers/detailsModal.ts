const initialState = {
    visible: true, 
    selected: {},
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
        case 'detailsModal/CHANGE_FORM_DATA':
            const { field, value } = action.payload
            return {
                ...state,
                selected: { ...state.selected, [field]: value}
            }
        default:
            return state
    }
}