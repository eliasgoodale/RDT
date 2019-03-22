import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import startApplication from './startup';
import Layout from './components';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const store = startApplication("USING_REDUX_OBSERVABLE")

ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById('root') as HTMLElement
);



//store.dispatch(ActionGroup.collectionGetAll())



registerServiceWorker();
