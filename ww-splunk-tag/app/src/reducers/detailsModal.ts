import { compare } from 'fast-json-patch'
import { newTagTemplate } from '../types'

const initialState = {
    visible: false,
    selected: {
        id: "",
        tags: [],
    },
    backup: {
        id: "",
        tags: []
    },
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
                backup: action.payload,
                tagInEdit: null
            }
        case 'detailsModal/CANCEL_CHANGES':
            return initialState
        case 'collection/UPDATE_FULFILLED':
            return initialState
        case 'collection/CREATE_FULFILLED':
            return initialState
        case 'detailsModal/CHANGE_FORM_DATA':
            let { field, value } = action.payload
            const newSelected = { ...state.selected, [field]: value}
            return {
                ...state,
                selected: newSelected,
                patch: compare(state.backup, newSelected)
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
                    if (t.id[t.id.length - 1] === '0') {
                        let tag = {
                            ...t,
                            [action.payload.field]: action.payload.value
                        }
                        return {
                            ...tag,
                            splunkTag: tag.historianTag.replace(tag.prefix, "")
                        }
                    } else {
                        return t.id === action.payload.id ? 
                        { ...t, [action.payload.field]: action.payload.value } : t 
                    }
                })
            }
            return {
                ...state,
                selected: newSelectedTags,
                patch: compare(state.backup, newSelectedTags)
            }
        case 'tags/CREATE_TAG':
            const createID = `${state.selected.id}-0`
            return {
                ...state,
                tagInEdit: createID,
                selected: {
                    ...state.selected,
                    tags: [newTagTemplate(createID), ...state.selected.tags]
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
        case 'tags/RE_INDEX':
            return {
                ...state,
                selected: {
                    ...state.selected,
                    tags: action.payload
                }
            }
        default:
            return state
    }
}