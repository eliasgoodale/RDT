import * as React from 'react'
import { useState } from 'react'

import * as ActionGroup from '../actions'

import { Splitter } from '@progress/kendo-react-layout'

import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid'
import { Input } from '@progress/kendo-react-inputs'
import { Dialog } from '@progress/kendo-react-dialogs'

import { Button } from '@progress/kendo-react-buttons'

import { connect } from 'react-redux';



import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Typeography from '@material-ui/core/Typography'


const panesDefault = [
    { size: '50%', min: '20px', resizable: false},
    { }
]

const styles = {
    button: {
        margin: '5px'
    },
    select: {
        margin: '5px',
        width: '175px'
    },

    dateInput: {
        margin: '5px'
    },
    pane: {
        padding: 10,
        alignContent: 'center'
    },
    input: {
        margin: '5px',
    }
}


const DetailsForm = ({saveChanges, onChange, selected}: any): any => {

    const [panes, setpanes] = useState(panesDefault)
    return (

       <Splitter

           panes={panes}
           onLayoutChange={(updatedState:any) => setpanes(updatedState)}
       >
           <div className="pane-content" style={styles.pane} >
           <Input style={styles.input}
                name="index"
                label="Index"
                value={selected.index}
                onChange={onChange}
            />
            <br/>
            <Input style={styles.input}
                name="location"
                label="Location"
                value={selected.location}
                onChange={onChange}
            />
            <br/>

        <FormControl>
          <InputLabel htmlFor="age-native-simple">Status</InputLabel>
            <Select style={styles.select}
              native
              name="status"
              value={selected.status}
              onChange={onChange}
            >
            <option value=""/>
            <option value={"Production"}>Production</option>
            <option value={"Test"}>Test</option>
            <option value={"Inactive"}>Inactive</option>
          </Select>
        </FormControl>
            <br/>
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

           <div className="pane-content" style={styles.pane}>

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
           <Input style={styles.input}
            name="lastRun"
            label="Last Run"
            value={selected.lastRun}
            contentEditable={false}
            />
            <br/>
            <FormControl>
          <InputLabel htmlFor="age-native-simple">Run Status</InputLabel>
            <Select
              style={styles.select}
              native
              name="runStatus"
              value={selected.runStatus}
              onChange={onChange}
            >
            <option value=""/>
            <option value={"Success"}>Success</option>
            <option value={"Failure"}>Failure</option>
          </Select>
        </FormControl>
        <br/>
        <FormControl>

            <TextField
                id="datetime-local"
                type="datetime-local"
                label="Next run pull tags from"
                name="nextRun"
                onChange={onChange}
                value={selected.nextRun}

                InputLabelProps={{
            shrink: true,
        }}
      />
        </FormControl>
           </div>

       </Splitter>

    )
}



class DetailsModal extends React.Component<any, {}> {
    render () {
        const { visible, selected, onRowClick, onFormChange, onTagChange, saveChanges, tagInEdit, createTag, deleteTag, deleteAllTags, hideDetails } = this.props

        const tags = selected.hasOwnProperty('tags') ? selected.tags.map( (t: any) => {return {...t, tagInEdit: t.id === tagInEdit}}) :
            []
        return (
                visible && 
                <Dialog
                    title="Details View"
                    onClose={hideDetails}>
                <div>
                    <DetailsForm 
                        selected={selected} 
                        onChange={onFormChange} 
                        saveChanges={saveChanges}/>
                </div>
                <br/>

                    <Grid
                        data={tags}
                        onRowClick={onRowClick}
                        editField="tagInEdit"
                        onItemChange={onTagChange}>
                        
                    <GridToolbar>
                    <div>
                        <Button 
                            style={styles.button}>
                            Import from Excel</Button>
                        <Button 
                            style={styles.button}
                            onClick={createTag}>
                            New Tag</Button>
                        <Button 
                            style={styles.button}
                            onClick={() => deleteTag(tagInEdit)}>
                            Remove Tag </Button>
                        <Button 
                            style={styles.button}
                            onClick={deleteAllTags}>
                            Remove All Tags</Button>
                        <Typeography style={{float: 'right' }} ># of tags: {tags.length}</Typeography>
                    </div>
                    </GridToolbar>
                        <Column key="prefix" field="prefix" title="Prefix"/>
                        <Column key="historianTag" field="historianTag" title="Historian Tag"/>
                        <Column key="splunkTag" field="splunkTag" title="Splunk Tag" editable={false}/>
                    
                    </Grid>
            
            </Dialog>
        )
    }
}


function mapStateToProps(state: any) {
    return {
        selected: state.detailsModal.selected,
        visible: state.detailsModal.visible,
        tagInEdit: state.detailsModal.tagInEdit
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        hideDetails: () => dispatch(ActionGroup.hideDetails()),
        saveChanges: (selected: any) => {
            dispatch(ActionGroup.collectionUpdate(selected))
        },
        onRowClick: (e: any) => {
            dispatch(ActionGroup.changeTagInEdit(e.dataItem.id))
        },
        onFormChange: (e: any) => {
            dispatch(ActionGroup.changeFormData({field: e.target.name, value: e.target.value}))
        },
        onTagChange: (e: any) => {
            dispatch(ActionGroup.changeTagData(e.dataItem.id, e.field, e.value))
        },
        createTag: () => dispatch(ActionGroup.createTag()),
        deleteTag: (id: string) => dispatch(ActionGroup.deleteTag(id)),
        deleteAllTags: () => dispatch(ActionGroup.deleteAllTags())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsModal)