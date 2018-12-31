import { compare } from 'fast-json-patch'

const initialState = {
    visible: false,
    selected: {
        tags: [],
    },
    backup: {},
    patch: [],
    tagInEdit: null,
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
                selected: action.payload,
                tagInEdit: null
            }
        case 'detailsModal/LOAD_BACKUP':
            return {
                ...state,
                backup: action.payload
            }
        case 'detailsModal/CHANGE_FORM_DATA':
            let { field, value } = action.payload
            const newSelected = { ...state.selected, [field]: value}
            return {
                ...state,
                selected: newSelected,
                patch: compare(state.selected, newSelected)
            }
        case 'tags/CHANGE_TAG_IN_EDIT':
            return {
                ...state,
                tagInEdit: action.payload
            }

        case 'tags/CHANGE_TAG_DATA':
            const newSelectedTags = {
                ...state.selected, 
                tags: state.selected.tags.map((t: any) => {
                    return t.id === action.payload.id ? 
                    { ...t, [action.payload.field]: action.payload.value } : t
                })
            }
            return {
                ...state,
                selected: newSelectedTags,
                patch: compare(state.selected, newSelectedTags)
            }
        case 'tags/CREATE_TAG':
            return {
                ...state,
                tagInEdit: "temp",
                selected: {
                    ...state.selected,
                    tags: [{id: "temp"}, ...state.selected.tags]
                }
            }
        case 'tags/DELETE_TAG':
            return {
                ...state,
                tagInEdit: null,
                selected: {
                    ...state.selected,
                    tags: state.selected.tags.filter( (t: any) => t.id !== action.payload)
                }
            }
        case 'tags/DELETE_ALL_TAGS':
            return {
                ...state,
                tagInEdit: null,
                selected: {
                    ...state.selected,
                    tags: []
                }
            }
        default:
            return state
    }
}