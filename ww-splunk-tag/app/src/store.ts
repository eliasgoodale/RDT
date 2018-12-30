import { createStore, applyMiddleware } from 'redux'

import logger from './logger'
import promise from 'redux-promise-middleware'
import { createEpicMiddleware } from 'redux-observable'

import rootEpic from './epics'
import rootReducer from './reducers'


const epicMiddleware = createEpicMiddleware();

function configureStore() {
    const createdStore = createStore( 
        rootReducer,
        applyMiddleware(
            epicMiddleware,         
            logger,
            promise() 
        ))
    epicMiddleware.run(rootEpic)
    return createdStore;
}

export default configureStore()

