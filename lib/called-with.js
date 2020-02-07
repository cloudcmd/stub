'use strict';

const diff = require('jest-diff').default;
const strip = require('strip-ansi');
const chalk = require('chalk');

module.exports = ({called, args, calledArgs}) => {
    if (!called) {
        console.log(chalk.red(`expected to call with ${JSON.stringify(args)}, but not called at all`));
        return false;
    }
    
    const msg = diff(calledArgs, args);
    const striped = strip(msg);
    
    if (striped === 'Compared values have no visual difference.')
        return true;
    
    console.log(msg);
    
    return false;
};

