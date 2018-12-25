import * as React from 'react';

import '@progress/kendo-theme-default/dist/all.css'

import SplunkGrid from './SplunkGrid';


class Layout extends React.Component {
  public render() {
    return (
      <div>
        <SplunkGrid/>
      </div>
    );
  }
}

export default Layout;