import { map, filter, mapTo } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { indexCollection } from '../entities'

/**
 *  Get_All Action Chain Handler
 */

const getAllSuccess = (processedData: any) => ({
    type: 'collection/GET_ALL_SUCCESS',
    payload: processedData
})

function processGetAllResponse(response: AxiosResponse) {
    const { data } = response;
    indexCollection.addData(data);
    //TODO add validation chain
    return  indexCollection.serializedMembers ;
}

export const handleGetAllRequestFulfillment = (action$: any) => action$.pipe(
    filter(({ type }: any) => type == 'collection/GET_ALL_FULFILLED'),
    map(({ payload }: any) => processGetAllResponse(payload)),
    map((processedData: any) => getAllSuccess(processedData))
)


/** 
 *  Post Action Chain Handler
 */


const createSuccess = (processedData: any) => ({
    type: 'collection/CREATE_SUCCESS',
    payload: processedData
})

function processCreateResponse(response: AxiosResponse) {
    const newIndex = response.data;
    console.log(newIndex);
    indexCollection.addData([newIndex]);

    return indexCollection.serializedMembers;
}

export const handleCreateRequestFulfillment = (action$: any) => action$.pipe(
    filter(({type}: any) => type == 'collection/CREATE_FULFILLED'),
    map(({ payload }: any) => processCreateResponse(payload)),
    map((processedData: any) => createSuccess(processedData)))


/**
 * Update Action Chain Handler
 */

const updateSuccess = (processedData: any) => ({
    type: 'collection/UPDATE_SUCCESS',
    payload: processedData
})

function processUpdateResponse(response: AxiosResponse) {
    const updatedIndex = response.data;
    indexCollection.replaceItem(updatedIndex);

    return indexCollection.serializedMembers;
}

export const handleUpdateRequestFulfillment = (action$: any) => action$.pipe(
    filter(({type}: any) => type == 'collection/UPDATE_FULFILLED'),
    map(({ payload }: any) => processUpdateResponse(payload)),
    map((processedData: any) => updateSuccess(processedData)))
