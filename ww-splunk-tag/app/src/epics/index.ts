import { map, filter } from 'rxjs/operators'
import { combineEpics } from 'redux-observable'
import { newIndexTemplate } from '../types';

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

export const showDetails = () => ({
    type: "detailsModal/SHOW"
})


const rowDoubleClickIG = (action$: any) => action$.pipe(
    filter(({ type }: any) => type === 'indicesGrid/ROW_CLICK'),
    map(({ payload }: any ) => changeSelected(payload))
)

const enterCreateMode = (action$: any) => action$.pipe(
    filter (({ type }: any) => type === 'indicesGrid/ENTER_CREATE'),
    map(() => loadBackup([newIndexTemplate])),
    map(() => changeSelected(newIndexTemplate))
)

const rowClickIG = (action$: any) => action$.pipe(
    filter(({ type }: any) =>
        type === 'indicesGrid/ROW_CLICK' ||
        type === 'indicesGrid/ENTER_CREATE'
    ),
    map(({ payload }: any ) => showDetails())
)

const processDataToIG = (action$: any, state$: any) => action$.pipe(
    filter(({ type }: any) => 
        type === 'collection/GET_ALL_FULFILLED' ||
        type === 'collection/UPDATE_FULFILLED'
    ),
    map(({ payload }: any) => importDataIG(state$.value.collection.data)),
)

const loadBackupIndex = (action$: any, state$: any) => action$.pipe(
    filter(({ type }: any) => type === 'detailsModal/CHANGE_SELECTED'),
    map(({ payload }: any) =>  
        loadBackup(state$.value.collection.data.filter(
            (index: any) => index.id === payload.id)))
)

export default combineEpics(enterCreateMode, rowDoubleClickIG, rowClickIG, processDataToIG, loadBackupIndex)