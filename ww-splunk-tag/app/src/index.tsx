import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import store from './store'
import Layout from './components';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import * as ActionGroup from './actions'

ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

store.dispatch(ActionGroup.collectionGetAll())

registerServiceWorker();
