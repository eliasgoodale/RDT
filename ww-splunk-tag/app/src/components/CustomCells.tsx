import * as React from 'react';
import { DatePicker } from '@progress/kendo-react-dateinputs';

class DateCell extends React.Component<any, {}> {

    render() {
        const { lastRun } = this.props.dataItem;
        return (
            <DatePicker
                format={"dd-MMM-yyyy HH:mm:ss"}
                value={new Date(lastRun)}
                width={200} />
        )
    }
}

export {
    DateCell
}