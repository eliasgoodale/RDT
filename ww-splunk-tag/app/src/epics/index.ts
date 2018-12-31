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

const loadBackup = (backupData: any) => {
    return( 
        backupData.length > 0 ? 
        {
            type: 'detailsModal/LOAD_BACKUP',
            payload: backupData[0]
        } : 
        { type: 'detailsModal/LOAD_BACKUP_FAILURE' }
    )
};

const rowDoubleClick = (action$: any) => action$.pipe(
    filter(({ type }: any) => type === 'indicesGrid/ROW_CLICK'),
    map(({ payload }: any ) => changeSelected(payload))
)

const processDataToIG = (action$: any) => action$.pipe(
    filter(({ type }: any) => type === 'collection/GET_ALL_FULFILLED'),
    map(({ payload }: any) => importDataIG(payload.data)),
)

const loadBackupIndex = (action$: any, state$: any) => action$.pipe(
    filter(({ type }: any) => type === 'detailsModal/CHANGE_SELECTED'),
    map(({ payload }: any) =>  
        loadBackup(state$.value.collection.data.filter(
            (index: any) => index.id === payload.id)))
)

export default combineEpics(rowDoubleClick, processDataToIG, loadBackupIndex)