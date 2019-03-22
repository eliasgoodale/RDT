// import { createStore, applyMiddleware } from 'redux'

// import logger from './utils/logger'
// import promise from 'redux-promise-middleware'
// import { createEpicMiddleware } from 'redux-observable'

// import rootEpic from './epics'
// import rootReducer from './reducers'

// export function reduxObservableStore() {
//     const epicMiddleware = createEpicMiddleware();
//     const store = createStore( 
//         rootReducer,
//         applyMiddleware(
//             epicMiddleware,         
//             logger,
//             promise() 
//         ))
//     epicMiddleware.run(rootEpic);
//     return store;
// }

import { createStore, applyMiddleware } from 'redux'

import logger from './utils/logger'
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
        ));
    epicMiddleware.run(rootEpic);
    return createdStore;
}

const store = configureStore();

export default store;