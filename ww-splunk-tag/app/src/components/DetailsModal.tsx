import * as React from 'react'
import { useState } from 'react'

import * as ActionGroup from '../actions'

import { Splitter } from '@progress/kendo-react-layout'

import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid'

import { Dialog } from '@progress/kendo-react-dialogs'

import { Button } from '@progress/kendo-react-buttons'

import { connect } from 'react-redux';

import {validateIndex, validateTag} from '../middleware'

import Input  from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Typeography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'


const panesDefault = [
    { size: '50%', min: '20px'},
    { }
]

const styles = {
    container: {
        marginTop: 15,
        marginBottom: 15,
    },
    button: {
        margin: '5px'
    },
    select: {

        width: '175px'
    },
    dateInput: {
        margin: '5px'
    },
    pane: {
        height: 300,
        padding: 10,
        alignContent: 'center'
    },
    input: {
        margin: '5px',
    },
    grid: {
        height: 450
    },
}


const DetailsForm = ({
    saveChanges,
    onChange,
    selected,
    patch,
    createMode,
    createIndex,
    onCancel}: any): any => {

    const [panes, setPanes] = useState(panesDefault)
    return (
        <Paper elevation={5}>
        <Splitter
            panes={panes}
            onLayoutChange={(updatedState:any) => setPanes(updatedState)}
        >
        <div className="pane-content" style={styles.pane} >
           
            <div style={styles.container}>
            <FormControl>
            <InputLabel htmlFor="status">Index</InputLabel>
            <br/>
                <Input style={styles.input}
                name="index"
                value={selected.index}
                onChange={onChange} 
                />
            </FormControl>
            </div>
        
            <div style={styles.container}>
            <FormControl>
            <InputLabel htmlFor="status">Location</InputLabel>
            <br/>
                <Input style={styles.input}
                name="location"
                value={selected.location}
                onChange={onChange}
                />
            </FormControl>
            </div>

        <div style={styles.container}>
        <FormControl>
          <InputLabel htmlFor="status">Status</InputLabel>
          <br/>
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
        </div>

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
           <div style={styles.container}>
           <Button 
            style={styles.button}>
            Run Now</Button>

            { createMode ?  
            <Button
            style={styles.button}
            onClick={() => createIndex(selected)}
            disabled={validateIndex(selected).error !== null}>
               Create </Button> 
               :
           <Button 
            style={styles.button}
            onClick={() => saveChanges(selected)}
            disabled={validateIndex(selected).error !== null || patch.length === 0}>
                Save </Button> }

           <Button 
            style={styles.button}
            onClick={onCancel}>
            Cancel</Button>
            </div>

            <div style={styles.container}>
            <FormControl>
            <TextField
                id="lastRun"
                type="datetime-local"
                label="Last Run"
                name="lastRun"
                onChange={onChange}
                value={selected.lastRun}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            </FormControl>
            </div>

            <div style={styles.container}>
            <FormControl>
                <InputLabel htmlFor="age-native-simple">Run Status</InputLabel>
                <Input value={selected.runStatus} readOnly={true}/>
            </FormControl>
            </div>
            
            <div style={styles.container}>
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

        </div>
       </Splitter>
       </Paper>

    )
}



class DetailsModal extends React.Component<any, {}> {
    render () {
        const { 
            visible,
            selected,
            onRowClick,
            onFormChange,
            onTagChange,
            saveChanges,
            tagInEdit,
            createTag,
            deleteTag,
            deleteAllTags,
            cancelChanges,
            patch,
            createMode,
            createIndex } = this.props

        const tags = selected.tags.map( (t: any) => {
            return {
                ...t, 
                tagInEdit: t.id === tagInEdit,

            }
        })
        let tag = tags.find((t: any) => t.id === tagInEdit)
        let validation = validateTag(tag)
        return (
                visible && 
                <Dialog
                    width={750}
                    height={900}
                    title="Details View"
                    onClose={cancelChanges}>
                <div>
                    <DetailsForm
                        onCancel={cancelChanges}
                        createIndex={createIndex}
                        patch={patch}
                        createMode={createMode}
                        selected={selected} 
                        onChange={onFormChange} 
                        saveChanges={saveChanges}/>
                </div>
                <br/>
                    <Paper elevation={10}>
                    <Grid
                        style={styles.grid}
                        data={tags}
                        onRowClick={(e: any) => {
                            if(tagInEdit) {
                                if (validation.error === null) {
                                    onRowClick(e);
                                } else {
                                    null
                                }
                            } else {
                                onRowClick(e);
                            }
                        }}
                        
                            
                        editField="tagInEdit"
                
                        onItemChange={onTagChange}>
                        
                    <GridToolbar>
                    <div>
                        <Button 
                            style={styles.button}>
                            Import from Excel</Button>
                        <Button 
                            style={styles.button}
                            onClick={createTag}
                            disabled={validation.error !== null}>
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
                    </Paper>
            </Dialog>
        )
    }
}


function mapStateToProps(state: any) {
    return {
        selected: state.detailsModal.selected,
        visible: state.detailsModal.visible,
        tagInEdit: state.detailsModal.tagInEdit,
        patch: state.detailsModal.patch,
        createMode: state.indicesGrid.createMode
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        cancelChanges: () => dispatch(ActionGroup.cancelChanges()),
        saveChanges: (selected: any) => {
            const update = {
                ...selected, 
                tags: selected.tags.map((t: any) => {
                    delete t.id
                    return t
                })
            }
            dispatch(ActionGroup.collectionUpdate(update))
        },
        createIndex: (selected: any) => {
            const newIndex = {
                ...selected, 
                tags: selected.tags.map((t: any) => {
                    delete t.id
                    return t
                })
            }
            dispatch(ActionGroup.collectionCreate(newIndex))
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