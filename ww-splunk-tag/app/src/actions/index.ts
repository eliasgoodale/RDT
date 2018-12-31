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


 /**
  * Details Modal
  */

 export const onRowClickDM = (dataItem: any) => ({
    type: "detailsModal/ROW_CLICK",
    payload: dataItem
 })

export const showDM = () => ({
    type: "detailsModal/SHOW"
})

export const hideDM = () => ({
    type: "detailsModal/HIDE"
})



export const changeFormData = (change: any) => ({
    type: "detailsModal/CHANGE_FORM_DATA",
    payload: change
})


