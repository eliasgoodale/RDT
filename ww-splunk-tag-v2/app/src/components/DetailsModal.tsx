import * as React from 'react'
import { useState } from 'react'

import * as ActionGroup from '../actions'

import { Splitter } from '@progress/kendo-react-layout'

import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid'

import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs'

import { Button } from '@progress/kendo-react-buttons'

import { connect } from 'react-redux';

import {validateIndex, validateTag} from '../utils'

import Input  from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Typeography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { FormControlLabel } from '@material-ui/core';
import deepOrange from '@material-ui/core/colors/deepOrange'
import grey from '@material-ui/core/colors/grey'
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

    },
    select: {
        width: '175px'
    },
    dateInput: {
        margin: '5px'
    },
    pane: {
        height: 270,
        padding: 10,
        alignContent: 'center'
    },
    input: {
    },
    grid: {
        height: 450
    },
    radioGroup: {
        marginTop: 10,
        width: 10,
        height: 10,
    },
    radioChecked: {
        color: deepOrange[600],

    },
    radio: {
        color: grey[500]
    }
}


const DetailsForm = ({onChange, selected}: any): any => {

    const [panes, setPanes] = useState(panesDefault)
    const [dateInput, setDateInput] = useState('lastRun')
    return (
        <Paper elevation={5}>
        <Splitter
            panes={panes}
            onLayoutChange={(updatedState:any) => setPanes(updatedState)}
        >
        <div className="pane-content" style={styles.pane} >
           
            <div style={styles.container}>
            <FormControl>
            <InputLabel htmlFor="status">Index Name</InputLabel>
            <br/>
                <Input style={styles.input}
                name="name"
                value={selected.name}
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
                name="entityType"
                value="Producer"
                id="producer-entity"
                className="k-radio"
                checked={selected.entityType === 'Producer'}
                onChange={onChange}
            />
            <label className="k-radio-label" htmlFor="producer-entity">Producer</label>
            <br/>
            <input 
                type="radio"
                name="entityType"
                value="SWD"
                id="swd-entity"
                className="k-radio"
                checked={selected.entityType === 'SWD'}
                onChange={onChange}
            />
            <label className="k-radio-label" htmlFor="swd-entity">SWD</label>
            </div>
           </div>

           <div className="pane-content" style={styles.pane}>

            <div style={styles.container}>
            <FormControl>
            <TextField
                id="lastRun"
                type="datetime-local"
                label="Last Run"
                name="lastRun"
                value={selected.lastRun}
                InputProps={{
                    readOnly: true,
                }}
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
           
           
            <InputLabel htmlFor="radioGroupLabel">Next run pull tags from:</InputLabel>
            <br/>

        <FormControl component="fieldset">

            <RadioGroup
            style={styles.radioGroup}
            aria-label="DateSelectionControl"
            name="dateSelect"
            value={dateInput}
            onChange={(e: any) => setDateInput(e.target.value)}
          >
        <FormControlLabel  value="lastRun" control={<Radio style={dateInput === 'lastRun' ? styles.radioChecked : styles.radio}/>} label="Last Run Date"/>
        <FormControlLabel  value="user" control={<Radio style={dateInput === 'user' ? styles.radioChecked : styles.radio}/>} label="Select Date"/>
        </RadioGroup>

        </FormControl>
        <div style={styles.container}>
            <FormControl>
                <TextField
                    id="datetime-local"
                    type="datetime-local"
                    name="nextRun"
                    onChange={onChange}
                    disabled={dateInput === 'lastRun'}
                    value={dateInput === 'lastRun' ? selected.lastRun : selected.nextRun}
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
            generateTags,
            cancelChanges,
            patch,
            createMode,
            createIndex,
            sort,
            changeSort} = this.props

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
                    title="Details"
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
                        onSortChange={changeSort}
                        sortable
                        sort={sort}
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
                            onClick={generateTags}>
                            Generate Splunk Tags
                            </Button>
                        <Typeography style={{float: 'right' }} ># of tags: {tags.length}</Typeography>
                    </div>
                    </GridToolbar>
                        <Column key="name" field="name" title="Name"/>          
                    </Grid>
                    </Paper>
                    <DialogActionsBar>
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
                        onClick={cancelChanges}>
                        Cancel</Button>

                    </DialogActionsBar>

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
        createMode: state.indicesGrid.createMode,
        sort: state.detailsModal.sort,
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        cancelChanges: () => dispatch(ActionGroup.cancelChanges()),
        saveChanges: (update: any) => {
            dispatch(ActionGroup.collectionUpdate(update))
        },
        createIndex: (newIndex: any) => {
            dispatch(ActionGroup.collectionCreate(newIndex))
        },
        changeSort: (e: any) => {
            dispatch(ActionGroup.changeSortTags(e.sort))
        },
        onRowClick: (e: any) => {
            dispatch(ActionGroup.changeTagInEdit(e.dataItem.id))
        },
        // TODO Make onFormChange and onTagChange use the same generic action handler
        onFormChange: (e: any) => {
            dispatch(ActionGroup.changeFormData({field: e.target.name, value: e.target.value}))
        },
        onTagChange: (e: any) => {
            console.log(e);
            dispatch(ActionGroup.changeTagData(e.dataItem.id, e.field, e.value))
        },
        createTag: () => dispatch(ActionGroup.createTag()),
        deleteTag: (id: string) => dispatch(ActionGroup.deleteTag(id)),
        generateTags: () => dispatch(ActionGroup.generateTags())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsModal)