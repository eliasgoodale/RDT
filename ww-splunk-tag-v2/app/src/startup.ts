import store from './storeConfig';
import { applicationStart, collectionGetAll } from './actions';
import { AxiosResponse } from 'axios';
import { Index, IndexCollection, IndexSerializer} from './types/SplunkIndex';
import { defaultTemplate } from './types';
import { logAction } from './epics';
//import { Dispatch } from 'redux';
//import HttpClient from './utils/client';

// function setupHttpClient() {
//     const client = new HttpClient({ baseURL: "http://localhost:5000" })
    
//     client.createEntity({ name: 'indexes' })

//     return client;
// }

/**
 * 
 *  payload:
 *  config: {adapter: ƒ, transformRequest: {…}, transformResponse: {…}, timeout: 0, xsrfCookieName: "XSRF-TOKEN", …}
 *  data: (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
 *  headers: {pragma: "no-cache", content-type: "application/json; charset=utf-8", cache-control: "no-cache", expires: "-1"}
 *  request: XMLHttpRequest {onreadystatechange: ƒ, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
 *  status: 200
 *  statusText: "OK"
 */


export function indexCollectionSetupRoutine (response: AxiosResponse) {
    const { data } = response;
    const collection = new IndexCollection(data, defaultTemplate);


    // TODO add validation on initial run of collection;

    return collection.serializedMembers
}


export default function applicationStartup(directive: string) {
        
        switch(directive) {
            case "USING_REDUX_OBSERVABLE":
                store.dispatch(applicationStart());
                store.dispatch(collectionGetAll());
                return store;

            default:
                throw new Error("No startup directive specified stopping ... ");
        }
}
