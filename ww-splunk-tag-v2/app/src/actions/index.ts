import HttpClient from '../utils/client';
import { SortDescriptor } from '@progress/kendo-data-query';
import { transform_request_body } from './actions';



const client = new HttpClient({
    baseURL: "http://localhost:5000"
})

client.createEntity({
    name: 'indexes'
})

/**
 * There are two entities, indices and details
 */

 export const loadTags = (tags: any) => ({
     type: "details/LOAD_TAGS",
     payload: tags
 })

export const applicationStart = () => ({
    type: "main/STARTUP",
})
 /**
  * Collection
  */
 
 export const collectionCreate = (newIndex: any) => {
    
    const requestBody = transform_request_body(newIndex, "create");
    console.log("CREATE_REQUEST_BODY: ", requestBody)
    return {
        type: "collection/CREATE",
        payload: client.endpoints.indexes.create(requestBody) 
    }
 }

export const collectionUpdate = (update: any) => {

    const requestBody = transform_request_body(update, "update");
    console.log("UPDATE_REQUEST_BODY: ", requestBody)

    return {
        type: "collection/UPDATE",
        payload: client.endpoints.indexes.update(requestBody)
    }
}

export const collectionDelete = (id: string) => ({
    type: "collection/DELETE",
    payload: client.endpoints.indexes.delete(id)
})

export const collectionGetAll = () => ({
    type: "collection/GET_ALL",
    payload: client.endpoints.indexes.getAll()
})

/**
 * Indices Grid
 */
 
 export const onRowClickIG = (dataItem: any) => ({
    type: "indicesGrid/ROW_CLICK",
    payload: dataItem
 })

 export const enterCreateIG = () => ({
     type: "indicesGrid/ENTER_CREATE"
 })

 export const changeSortIG = (sort: SortDescriptor []) => ({
     type: "indicesGrid/CHANGE_SORT",
     payload: sort,
 })
 /**
  * Details Modal
  */

 export const onRowClickDM = (dataItem: any) => ({
    type: "detailsModal/ROW_CLICK",
    payload: dataItem
 })

export const showDetails = () => ({
    type: "detailsModal/SHOW"
})

export const hideDetails = () => ({
    type: "detailsModal/HIDE"
})

export const cancelChanges = () => ({
    type: 'detailsModal/CANCEL_CHANGES'
})

export const changeFormData = (change: any) => ({
    type: "detailsModal/CHANGE_FORM_DATA",
    payload: change
})

/**
 * 
 * Tags Grid
 */

export const changeTagInEdit = (id: string) => ({
    type: "tags/CHANGE_TAG_IN_EDIT",
    payload: id
})

export const changeTagData = (id: string, field: any, value: any) => ({
    type: "tags/CHANGE_TAG_DATA",
    payload: {id, field, value}
})

export const createTag = () => ({
    type: "tags/CREATE_TAG"
})

export const deleteTag = (id: string) => ({
    type: "tags/DELETE_TAG",
    payload: id
})

export const deleteAllTags = () => ({
    type: "tags/DELETE_ALL_TAGS"
})

export const generateTags = () => ({
    type: "tags/GENERATE_SPLUNK_TAGS"
})

export const changeSortTags = (sort: any) => ({
    type: "tags/CHANGE_SORT",
    payload: sort
})