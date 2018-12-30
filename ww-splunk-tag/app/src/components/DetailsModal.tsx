import * as React from 'react'
import * as ActionGroup from '../actions'



import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid'
import { Input } from '@progress/kendo-react-inputs'

import { connect } from 'react-redux';


class DetailsModal extends React.Component<any, {}> {
    render () {
        const { visible, selected, onRowClick, handleSubmit, onChange } = this.props
        return (
                visible && 
                <React.Fragment>
                <form className="k-form" onSubmit={handleSubmit}>
                                <fieldset>
                                    <legend>Input Values</legend>
                                    <div className="mb-3">
                                        <Input
                                            name="index"
                                            label="Index"
                                            value={selected.index}
                                            onChange={onChange}
                                        />
                                    </div>
                                </fieldset>
                                <input type="submit" className="k-button k-primary" value="Search" />
                            </form>
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