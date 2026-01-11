import {
    styleText,
    stripVTControlCharacters,
} from 'node:util';
import {diff} from 'jest-diff';

export default ({log, called, args, calledArgs}) => {
    if (!called) {
        log(styleText('red', `expected to call with ${JSON.stringify(args)}, but not called at all`));
        return false;
    }
    
    const msg = diff(calledArgs, args);
    const striped = stripVTControlCharacters(msg);
    
    if (striped === 'Compared values have no visual difference.')
        return true;
    
    log(msg);
    
    return false;
};
