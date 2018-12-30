import * as React from 'react'
import { useState } from 'react'

import * as ActionGroup from '../actions'

//import { Splitter } from '@progress/kendo-react-layout'
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid'
//import { Input } from '@progress/kendo-react-inputs'

import { connect } from 'react-redux';

// const defaultPaneState = [
//     { size: '50%', min: '20px', collapsible: true },
//     { }
// ]

function Example() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }

// const DetailsForm = ({handleSubmit, onChange, selected}: any): any => {
//     const [panes, setPanes] = useState(defaultPaneState)
//     return (

//         <form className="k-form" onSubmit={handleSubmit}>
//         <fieldset>
//             <legend>Input Values</legend>
//             <Splitter 
//             panes={panes}
//             orientation='vertical'
//             onLayoutChange={(updatedState: any) => setPanes(updatedState)} >

//             {/* Left Pane */}
//             <div className="pane-content">
//                 <div className="mb-3">
//                     <Input
//                         name="index"
//                         label="Index"
//                         value={selected.index}
//                         onChange={onChange}
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <Input
//                         name="location"
//                         label="Location"
//                         value={selected.location}
//                         onChange={onChange}
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <Input
//                         name="status"
//                         label="Status"
//                         value={selected.status}
//                         onChange={onChange}
//                     />
//                 </div>
//             </div>

//              {/* Right Pane */}
//             <div className="pane-content">
//                 <div className="mb-3">
//                     <Input
//                         name="lastRun"
//                         label="Last Run"
//                         value={selected.lastRun}
//                         onChange={onChange}
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <Input
//                         name="runStatus"
//                         label="Run Status"
//                         value={selected.runStatus}
//                         onChange={onChange}
//                     />
//                 </div>
//             </div>
            
//             </Splitter>
//         </fieldset>
//         <input type="submit" className="k-button k-primary" value="Search" />
//     </form>
//     )
// }

class DetailsModal extends React.Component<any, {}> {
    render () {
        const { visible, selected, onRowClick,  } = this.props
        return (
                visible && 
                <React.Fragment>
                    {/* <DetailsForm 
                        selected={selected} 
                        onChange={onChange} 
                        handleSubmit={handleSubmit}/> */}
                        <Example/>
                    <Grid
                        data={selected.tags}
                        onRowClick={onRowClick}>
                    <GridToolbar/>
                        <Column key="prefix" field="prefix" title="Prefix"/>
                        <Column key="historianTag" field="historianTag" title="Historian Tag"/>
                        <Column key="splunkTag" field="splunkTag" title="Splunk Tag" editable={false}/>
                    
                    </Grid>
            </React.Fragment>
        )
    }
}


function mapStateToProps(state: any) {
    return {
        selected: state.detailsModal.selected,
        visible: state.detailsModal.visible,
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        onRowClick: (e: any) => {
            dispatch(ActionGroup.onRowClickDM(e.dataItem))
        },
        handleSubmit: () => {
            dispatch(ActionGroup.handleSubmit())
        },
        onChange: (e: any) => {
            dispatch(ActionGroup.changeFormData({field: e.target.name, value: e.target.value}))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsModal)