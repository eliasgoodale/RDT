import * as React from 'react'
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid'
import { Button } from '@progress/kendo-react-buttons'

const styles = {
    button: {
        margin: '5px'
    },
}
class TagGrid extends React.Component<any, {}> {
    render () {
        const {tags, onRowClick, onTagChange, createTag, deleteTag, deleteAllTags, tagInEdit} = this.props
        return (
            <Grid
                data={tags}
                onRowClick={onRowClick}
                editField="tagInEdit"
                onItemChange={onTagChange}>

            <GridToolbar>
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
            </GridToolbar>
                <Column key="prefix" field="prefix" title="Prefix"/>
                <Column key="historianTag" field="historianTag" title="Historian Tag"/>
                <Column key="splunkTag" field="splunkTag" title="Splunk Tag" editable={false}/>

            </Grid>
        )
    }
}

export default TagGrid