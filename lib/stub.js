'use strict';

const calledWith = require('./called-with');
const noop = () => {};

module.exports = (impl = noop) => {
    let args = [];
    const returns = {
        called: false,
    };
    
    const fn = (...a) => {
        args = a;
        fn.called = true;
        
        const result = impl(...a);
        
        if (returns.called)
            return returns.value;
        
        return result;
    };
    
    fn.called = false;
    fn.calledWith = (...calledArgs) => calledWith({
        args,
        called: fn.called,
        calledArgs,
    });
    
    fn.returns = (value) => {
        returns.called = true;
        returns.value = value;
        
        return fn;
    };
    
    return fn;
};

