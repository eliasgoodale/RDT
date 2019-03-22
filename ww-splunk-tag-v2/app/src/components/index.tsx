import * as React from 'react';

import '@progress/kendo-theme-default/dist/all.css'

import IndicesGrid from './IndicesGrid';
import DetailsModal from './DetailsModal';

class Layout extends React.Component {
  public render() {
    return (
      <div>
        <IndicesGrid/>
        <DetailsModal/>
      </div>
    );
  }
}

export default Layout;