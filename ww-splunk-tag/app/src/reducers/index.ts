// export const initialState = {
//     indexGrid: {
//         fetching: false,
//         fetched: false,
//         errors: [],
//         data: []
//     },
//     detailsModal: {
//         index: "",
//         location: "",
//         status: "Inactive",
//         entity: 0, // 0 Producer 1 SWD
//         lastRunStatus: "",
//         lastRun: "",
//         nextRun: "",
//         numTags: 0,
//         tags: []
//     }
// }
import { combineReducers } from 'redux'

import collection from './collection'
import detailsModal from './detailsModal'
import indicesGrid from './indicesGrid'



export default combineReducers({
    collection,
    detailsModal,
    indicesGrid,
})
