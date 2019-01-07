import { map, filter, mapTo, bufferTime} from 'rxjs/operators'
import { combineEpics } from 'redux-observable'
import { newIndexTemplate } from '../types';
import { sortActive } from '../utils'

 const changeSelected = (dataItem: any) => ({
    type: 'detailsModal/CHANGE_SELECTED',
    payload: {
        ...dataItem, 
        tags: dataItem.tags.map((t: any, index: number) => {
            return {...t, id: `${dataItem.id}-${index + 1}`}
        })
    }
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
}

const reIndexAllTags = (tags: any) => ({
    type: "tags/RE_INDEX",
    payload: tags
})

export const showDetails = () => ({
    type: "detailsModal/SHOW"
})

export const hideDetails = () => ({
    type: "detailsModal/HIDE"
})



const rowClickIG = (action$: any) => action$.pipe(
    filter(({ type }: any) => type === 'indicesGrid/ROW_CLICK'),
    map(({ payload }: any ) => changeSelected(payload))
)

const enterCreateMode = (action$: any) => action$.pipe(
    filter (({ type }: any) => type === 'indicesGrid/ENTER_CREATE'),
    map(() => loadBackup([newIndexTemplate])),
    map(() => changeSelected(newIndexTemplate))
)

const rowDoubleClickIG = (action$: any) => action$.pipe(
    filter(({ type }: any) =>
        type === 'indicesGrid/ROW_DOUBLE_CLICK' ||
        type === 'indicesGrid/ENTER_CREATE'
    ),
    map(({ payload }: any ) => showDetails())
)

const processDataToIG = (action$: any, state$: any) => action$.pipe(
    filter(({ type }: any) => 
        type === 'collection/GET_ALL_FULFILLED' ||
        type === 'collection/UPDATE_FULFILLED' ||
        type === 'collection/CREATE_FULFILLED' ||
        type === 'indicesGrid/CHANGE_SORT'
    ),
    map(() => importDataIG(sortActive(state$.value.collection.data, state$.value.indicesGrid.sort))),
)

const hideDetailsModal = (action$: any) => action$.pipe(
    filter(({ type }: any) => 
        type === 'indicesGrid/IMPORT_DATA' ||
        type === 'detailsModal/CANCEL_CHANGES'
    ),
    map(() => hideDetails())
)

const loadBackupIndex = (action$: any, state$: any) => action$.pipe(
    filter(({ type }: any) => type === 'detailsModal/CHANGE_SELECTED'),
    map(({ payload }: any) =>  
        loadBackup(state$.value.collection.data.filter(
            (index: any) => index.id === payload.id)))
)

const reIndexTags = (action$: any, state$: any) => action$.pipe(
    filter(({ type }: any) => type ==='tags/CREATE_TAG'),
    map(() => reIndexAllTags(
        state$.value.detailsModal.selected.tags.map((t: any, index: number) => {
            return {...t, id: `${state$.value.detailsModal.selected.id}-${index}`}
        })
    ))
)

const doubleClick = (action$: any) => action$.pipe(
    filter(({ type }: any) => type === 'indicesGrid/ROW_CLICK'),
    bufferTime(500),
    map((buffer: any) => buffer.length),
    filter((len: any) => len >= 2),
    mapTo({type: 'indicesGrid/ROW_DOUBLE_CLICK' }),

)


export default combineEpics(
    doubleClick,
    enterCreateMode,
    reIndexTags,
    hideDetailsModal,
    rowClickIG,
    rowDoubleClickIG,
    processDataToIG,
    loadBackupIndex)