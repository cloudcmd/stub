'use strict';

const {diff} = require('jest-diff');
const strip = require('strip-ansi');
const chalk = require('chalk');

module.exports = ({log, called, args, calledArgs}) => {
    if (!called) {
        log(chalk.red(`expected to call with ${JSON.stringify(args)}, but not called at all`));
        return false;
    }
    
    const msg = diff(calledArgs, args);
    const striped = strip(msg);
    
    if (striped === 'Compared values have no visual difference.')
        return true;
    
    log(msg);
    
    return false;
};

