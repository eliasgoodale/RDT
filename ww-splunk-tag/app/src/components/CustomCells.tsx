import * as React from 'react';
import { DatePicker } from '@progress/kendo-react-dateinputs';

class DateCell extends React.Component {
    defaultValue = new Date(2018, 10, 23, 21, 55);
    render() {
        return (
            <DatePicker
                format={"dd-MMM-yyyy HH:mm:ss"}
                defaultValue={this.defaultValue}
                width={200} />
        )
    }
}

export {
    DateCell
}