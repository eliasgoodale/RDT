import * as React from 'react';
import TextField from '@material-ui/core/TextField'

const styles = {
    textField: {
        width: "100%",
        height: "100%"
    },
}
class DateCell extends React.Component<any, {}> {

    render() {
        const { lastRun } = this.props.dataItem;
        return (
            <TextField style={styles.textField}
            id="lastRun"
            type="datetime-local"
            name="lastRun"
            value={lastRun}
            variant="filled"
            InputProps={{
                readOnly: true
            }}
        />

        )
    }
}

export {
    DateCell
}