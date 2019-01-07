import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux'
import { combineEpics } from 'redux-observable'
import promise from 'redux-promise-middleware'
import { createEpicMiddleware } from 'redux-observable'

const clickEpic = (action)


const rootEpic = combineEpics(clickEpic) 


import { Provider } from 'react-redux'

import './index.css';

const store = 

ReactDOM.render(
  <Provider store={store}>
    <button>
      CLICK
    </button>
  </Provider>,
  document.getElementById('root') as HTMLElement
);


