import * as React from 'react'

import {
    Grid,
    GridColumn as Column,
    GridToolbar
  } from '@progress/kendo-react-grid'

import { Paper, Button } from '@material-ui/core';
import { DateCell } from './CustomCells';

const date= new Date('November 23, 2018 21:55:00')

const tableData: any = [
    {
        index: "Galaxy_SWD",
        location: "Galaxy",
        status: "Production",
        lastRun: date,
        runStatus: "Success"
    },

    {
        index: "Galaxy_1",
        location: "Galaxy",
        status: "Production",
        lastRun: date,
        runStatus: "Failed"
    },

    {
        index: "Galaxy_2",
        location: "Galaxy",
        status: "Production",
        lastRun: date,
        runStatus: "Sucess"
    },

    {
        index: "Quale_SWD",
        location: "Quale",
        status: "Production",
        lastRun: date,
        runStatus: "Success"
    },

    {
        index: "Quale_1",
        location: "Quale",
        status: "Production",
        lastRun: date,
        runStatus: "Success"
    },

    {
        index: "Dahl_SWD",
        location: "Dahl",
        status: "Production",
        lastRun: date,
        runStatus: "Success"
    },

];

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

class SplunkGrid extends React.Component<any, {}> {

    public constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
            <Paper style={styles.paper}>
                < Grid 
                    style={styles.grid}
                    data={tableData}
                    editField="inEdit"
                    filterable
                    resizable
                    sortable
                    reorderable >
                    <GridToolbar>
                        <Button variant="contained" size="small" style={styles.button}>
                            New Index
                        </Button>
                        <Button variant="contained" size="small" style={styles.button}>
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


export default SplunkGrid;