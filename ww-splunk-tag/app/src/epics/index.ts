import { map, filter } from 'rxjs/operators'
import { combineEpics } from 'redux-observable'

 const changeSelected = (dataItem: any) => ({
    type: 'detailsModal/CHANGE_SELECTED',
    payload: dataItem
})

 const importDataIG = (data: any) => ({
    type: "indicesGrid/IMPORT_DATA",
    payload: data
})

const rowDoubleClick = (action$: any) => action$.pipe(
    filter(({ type }: any) => type === 'indicesGrid/ROW_CLICK'),
    map(({ payload }: any ) => changeSelected(payload))
)

const processDataToIG = (action$: any) => action$.pipe(
    filter(({ type }: any) => type === 'collection/GET_ALL_FULFILLED'),
    map(({ payload }: any) => importDataIG(payload.data)),
)

export default combineEpics(rowDoubleClick, processDataToIG)