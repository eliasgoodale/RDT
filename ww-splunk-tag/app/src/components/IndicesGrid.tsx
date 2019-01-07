import * as React from 'react'

import { connect } from 'react-redux';
import * as ActionGroup from '../actions'

import {
    Grid,
    GridColumn as Column,
    GridToolbar
  } from '@progress/kendo-react-grid'

import { Paper, Button } from '@material-ui/core';
import { DateCell } from './CustomCells';

const styles = {
    paper: {
      padding: 8 * 3,
      elevation: 10,
      maxHeight: 750,
    },
    grid: {
      maxHeight: 750,
      container: {
        flex: 2,
      }
    },
    button: {
        margin: '5px'
    },

  }

class IndicesGrid extends React.Component<any, {}> {

    public constructor(props: any) {
        super(props);
    }

    render() {
        const {data, onRowClick, enterCreateMode, softDelete, selected} = this.props

        return (
            <React.Fragment>
            <Paper style={styles.paper}>
                < Grid 
                    style={styles.grid}
                    data={data}
                    onRowClick={onRowClick}
                    filterable
                    resizable
                    sortable
                    reorderable >
                    <GridToolbar>
                        <Button 
                            variant="contained" 
                            size="small" 
                            onClick={enterCreateMode} 
                            style={styles.button}>
                            New Index
                        </Button>
                        <Button 
                         variant="contained"
                         size="small" 
                         style={styles.button}
                         onClick={() => softDelete(selected.id)}>
                            Delete Index
                        </Button>
                    </GridToolbar>

                    <Column key='index' field='index' filter='text' title="Index" />
                    <Column key='location' field='location' filter='text' title="Location" />
                    <Column key='status' field='status' filter='text' title="Status" />
                    <Column key='lastRun' field='lastRun' title="Last Run" 
                        cell = { (props) => <DateCell {...props}/> }/>
                    <Column key='runStatus' field='runStatus' filter='text' title="Run Status" />
                </Grid>
            </Paper>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        data: state.indicesGrid.data,
        selected: state.indicesGrid.selected,
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        onRowClick: (e: any) => {
            dispatch(ActionGroup.onRowClickIG(e.dataItem))
        },
        enterCreateMode: () => {
            dispatch(ActionGroup.enterCreateIG())
        },
        softDelete: (id: string) => {
            /**
             * Replace with patch
             */
            dispatch(ActionGroup.collectionUpdate({id: id, isActive: false}))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(IndicesGrid);