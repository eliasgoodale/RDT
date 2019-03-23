
/*
{
    "id": "3389ffd",
    "enabled": true,
    "entityType": "SWD",
    "lastRun": "2017-05-04T11:30",
    "location": "Quale",
    "name": "Quale_SWD",
    "nextRun": "2017-05-24T10:30",
    "runStatus": "Success",
    "status": "Production",
    "tags": [
        "Default",
        "Default1",
        "Default2"
    ]
}
*/
import HttpClient from '../utils/client';
import { SortDescriptor } from '@progress/kendo-data-query';




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

export const collectionGetAll = () => ({
    type: "collection/GET_ALL",
    payload: client.endpoints.indexes.getAll()
})


export const collectionDelete = (id: string) => ({
    type: "collection/DELETE",
    payload: client.endpoints.indexes.delete(id)
})


/**
 * Indices Grid
 */

 export const indicesGridEnterCreate = () => ({
     type: "indicesGrid/ENTER_CREATE"
 })

 export const indicesGridExitCreate = () => ({
     type: "indicesGrid/EXIT_CREATE"
 })
 export const indicesGridChangeSort = (sort: SortDescriptor []) => ({
     type: "indicesGrid/CHANGE_SORT",
     payload: sort,
 })



/**
 * 
 * Tags Grid
 */

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




/**
 * Generic
 */

 export const rowClick = (entity: string) => (dataItem: any) => ({
     type: `${entity}/ROW_CLICK`,
     payload: dataItem
 });

 export const changeSort = (entity: string) => (sort: SortDescriptor[]) => ({
     type: `${entity}/CHANGE_SORT`,
     payload: sort
 });

 export const showModal = (entity: string) => () => ({
     type: `${entity}/SHOW`
 });

 export const hideModal = (entity: string) => () => ({
     type: `${entity}/HIDE`
 });

 export const cancelChanges = (entity: string) => () => ({
    type: `${entity}/CANCEL_CHANGES`
 });

 // {name, value}
 export const changeFormData = (entity: string) => (changeOp: any) => ({
    type: `${entity}/CHANGE_FIELD_DATA`,
    payload: changeOp
 });

// {id, name, value}
 export const editGridItem = (entity: string) => (changeOp: any) => ({
     type: `${entity}/CHANGE_GRID_DATA`,
     payload: changeOp
 })
function post_request_field_regularization(index: any) {
    return {
        id: "",
        enabled: index.enabled,
        entityType: index.entityType,
        lastRun: index.lastRun,
        location: index.location,
        name: index.name,
        nextRun: index.nextRun,
        runStatus: index.runStatus,
        status: index.status,
        tags: index.tags,
        eTag: index.eTag
    }
}

function update_request_field_regularization(index) {
    return {
        id: index.id,
        enabled: index.enabled,
        entityType: index.entityType,
        lastRun: index.lastRun,
        location: index.location,
        name: index.name,
        nextRun: index.nextRun,
        runStatus: index.runStatus,
        status: index.status,
        tags: index.tags,
        eTag: index.eTag
    }
}

function delete_request_field_regularization(index) {
    throw new Error("Not Implemented");
}


function serializeTags (tags: any) {
    return tags.map( (t: any) => {
        return t.name;
    })
}

export function transform_request_body(index: any, mode: string) {
    const toRegularize = { ...index, tags: serializeTags(index.tags) }
    switch(mode) {
        case "create":
            return post_request_field_regularization(toRegularize);
        case "update":
            return update_request_field_regularization(toRegularize);
        case "delete":
            return delete_request_field_regularization(toRegularize);
        default:
            return
    }
}