import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Layout from './components';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Layout />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
