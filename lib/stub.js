'use strict';

const calledWith = require('./called-with');
const noop = () => {};

module.exports = (impl = noop) => {
    let args = [];
    let calledWithNew = false;
    
    const returns = {
        called: false,
    };
    
    const fn = function anonymous(...a) {
        args = a;
        fn.called = true;
        fn.args.push(a);
        ++fn.callCount;
        
        calledWithNew = this instanceof anonymous;
        
        const result = impl(...a);
        
        if (returns.throwed)
            throw returns.error;
        
        if (returns.called)
            return returns.value;
        
        return result;
    };
    
    fn.args = [];
    fn.called = false;
    fn.callCount = 0;
    fn.calledWith = (...calledArgs) => calledWith({
        args,
        called: fn.called,
        calledArgs,
    });
    
    fn.calledWithNew = () => calledWithNew;
    
    fn.throws = (error) => {
        returns.throwed = true;
        returns.error = error;
        
        return fn;
    };
    
    fn.returns = (value) => {
        returns.called = true;
        returns.value = value;
        
        return fn;
    };
    
    return fn;
};

