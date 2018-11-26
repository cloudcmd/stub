'use strict';

const calledWith = require('./called-with');
const noop = () => {};

module.exports = (impl = noop) => {
    let args = [];
    let calledWithNew = false;
    const returns = {
        called: false,
    };
    
    const fn = function stub(...a) {
        args = a;
        fn.called = true;
        fn.args.push(a);
        
        calledWithNew = this instanceof stub;
        
        const result = impl(...a);
        
        if (returns.called)
            return returns.value;
        
        return result;
    };
    
    fn.args = [];
    fn.called = false;
    fn.calledWith = (...calledArgs) => calledWith({
        args,
        called: fn.called,
        calledArgs,
    });
    
    fn.calledWithNew = () => calledWithNew;
    
    fn.returns = (value) => {
        returns.called = true;
        returns.value = value;
        
        return fn;
    };
    
    return fn;
};

