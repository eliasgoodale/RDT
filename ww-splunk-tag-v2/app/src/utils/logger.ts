import { createLogger } from 'redux-logger';

const logFilter: string = 'no-key';

export default createLogger({
    predicate: (getState: any, action: any): boolean => {
        if (action == undefined)
            return;
        switch (logFilter) {
            case 'no-key':
                return action.type !== 'KEY_DOWN'
            default:
                return true;
            }
        }
})