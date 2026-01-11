'use strict';

const {diff} = require('jest-diff');
const {stripVTControlCharacters} = require('util');
const { styleText } = require('node:util');


module.exports = ({log, called, args, calledArgs}) => {
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

