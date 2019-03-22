import { combineReducers } from 'redux'

import collection from './collection'
import detailsModal from './detailsModal'
import indicesGrid from './indicesGrid'



export default combineReducers({
    collection,
    detailsModal,
    indicesGrid,
})
