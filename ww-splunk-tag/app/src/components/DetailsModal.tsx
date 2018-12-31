import * as React from 'react'
import { useState } from 'react'

import * as ActionGroup from '../actions'

import { Splitter } from '@progress/kendo-react-layout'

import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid'
import { Input } from '@progress/kendo-react-inputs'
import { DropDownList } from '@progress/kendo-react-dropdowns'
import { Button } from '@progress/kendo-react-buttons'
import { connect } from 'react-redux';
import { DatePicker } from '@progress/kendo-react-dateinputs';

const panesDefault = [
    { size: '50%', min: '20px', resizable: false},
    { }
]

const styles = {
    button: {
        margin: '5px'
    }
}


const DetailsForm = ({saveChanges, onChange, selected}: any): any => {

    const [panes, setpanes] = useState(panesDefault)
    return (

       <Splitter
           panes={panes}
           onLayoutChange={(updatedState:any) => setpanes(updatedState)}
       >
           <div className="pane-content">
           <Input
                name="index"
                label="Index"
                value={selected.index}
                onChange={onChange}
            />
            <br/>
            <Input
                name="location"
                label="Location"
                value={selected.location}
                onChange={onChange}
            />
            <br/>
            <DropDownList
                name="status"
                label="Status"
                value={selected.status}
                data={['Production', 'Test', 'Inactive']}
                onChange={onChange}
            />
            <div className="k-form-field">

            <input
                type="radio"
                name="entity"
                value="Producer"
                id="producer-entity"
                className="k-radio"
                checked={selected.entity === 'Producer'}
                onChange={onChange}
            />
            <label className="k-radio-label" htmlFor="producer-entity">Producer</label>
            <br/>
            <input
                type="radio"
                name="entity"
                value="SWD"
                id="swd-entity"
                className="k-radio"
                checked={selected.entity === 'SWD'}
                onChange={onChange}
            />
            <label className="k-radio-label" htmlFor="swd-entity">SWD</label>
            </div>
           </div>

           <div className="pane-content">

           <Button 
            style={styles.button}>
            Run Now</Button>
           <Button 
            style={styles.button}
            onClick={() => saveChanges(selected)}>
            Save</Button>
           <Button 
            style={styles.button}>
            Cancel</Button>
            <br/>
           <Input
            name="lastRun"
            label="Last Run"
            value={selected.lastRun}
            contentEditable={false}
            />
            <br/>
            <DropDownList
            name="runStatus"
            label="Run Status"
            value={selected.runStatus}
            data={['Success', 'Failure']}
            onChange={onChange}
            />
            <br/>
            <p>Next run pull tags from: </p>
            <DatePicker
                format={"dd-MMM-yyyy HH:mm:ss"}
                name="nextRun"
                value={new Date(selected.nextRun)}
                onChange={onChange}
                width={200}
            />
           </div>

       </Splitter>
    )
}

class DetailsModal extends React.Component<any, {}> {
    render () {
        const { visible, selected, onRowClick, onChange, saveChanges } = this.props
        return (
                visible && 
                <React.Fragment>
                    <DetailsForm 
                        selected={selected} 
                        onChange={onChange} 
                        saveChanges={saveChanges}/>
                    <Grid
                        data={selected.tags}
                        onRowClick={onRowClick}>
                    <GridToolbar>
                        <Button 
                            style={styles.button}>
                            Import from Excel</Button>
                        <Button 
                            style={styles.button}>
                            New Tag</Button>
                        <Button 
                            style={styles.button}>
                            Remove Tag</Button>
                        <Button 
                            style={styles.button}>
                            Remove All Tags</Button>

                    </GridToolbar>
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
        saveChanges: (selected: any) => {
            dispatch(ActionGroup.collectionUpdate(selected))
        },
        onChange: (e: any) => {
            dispatch(ActionGroup.changeFormData({field: e.target.name, value: e.target.value}))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsModal)