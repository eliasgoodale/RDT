

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
        default:
            return state;
    }
}