import HttpClient from '../client'




const client = new HttpClient({
    baseURL: "http://localhost:5000"
})

client.createEntity({
    name: 'indices'
})

/**
 * There are two entities, indices and details
 */

 export const loadTags = (tags: any) => ({
     type: "details/LOAD_TAGS",
     payload: tags
 })


 /**
  * Collection
  */
 
 export const collectionCreate = (newIndex: any) => ({
    type: "collection/CREATE",
    payload: client.endpoints.indices.create( {...newIndex, id:""} ) 
}) 

export const collectionUpdate = (patch: any) => ({
    type: "collection/UPDATE",
    payload: client.endpoints.indices.update(patch)
})

export const collectionDelete = (id: string) => ({
    type: "collection/DELETE",
    payload: client.endpoints.indices.delete(id)
})

export const collectionGetAll = () => ({
    type: "collection/GET_ALL",
    payload: client.endpoints.indices.getAll()
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