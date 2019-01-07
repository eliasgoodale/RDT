import * as React from 'react'

import { connect } from 'react-redux';
import * as ActionGroup from '../actions'

import {
    Grid,
    GridColumn as Column,
    GridToolbar,
    GridSortChangeEvent
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
        const {data, onRowClick, enterCreateMode, softDelete, selected, sort, changeSort} = this.props
        console.log(sort)
        return (
            <React.Fragment>
            <Paper style={styles.paper}>
                < Grid 
                    style={styles.grid}
                    data={data}
                    onRowClick={onRowClick}
                    resizable
                    sortable
                    onSortChange={changeSort}
                    sort={sort}
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
                    
                    <Column sortable key='index' field='index' title="Index" />
                    <Column sortable key='location' field='location' title="Location" />
                    <Column sortable key='status' field='status' title="Status" />
                    <Column sortable key='lastRun' field='lastRun' title="Last Run" 
                        cell = { (props) => <DateCell {...props}/> }/>
                    <Column sortable key='runStatus' field='runStatus' title="Run Status" />
                </Grid>
            </Paper>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        data: state.indicesGrid.data,
        selected: state.detailsModal.selected,
        sort: state.indicesGrid.sort,
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
        },
        changeSort: (e: GridSortChangeEvent) => {
            console.log(e)
            dispatch(ActionGroup.changeSortIG(e.sort))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(IndicesGrid);