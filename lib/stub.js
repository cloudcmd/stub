'use strict';

const calledWith = require('./called-with');
const noop = () => {};

const MARK = 'stub';

module.exports = stub;
module.exports.stub = stub;
module.exports.isStub = (fn) => {
    return fn && fn.__watermark === MARK;
};

let {log} = console;
module.exports.setLog = (fn) => log = fn;

function stub(impl = noop) {
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
        
        if (returns.resolved)
            return Promise.resolve(returns.value);
        
        if (returns.rejected)
            return Promise.reject(returns.error);
        
        if (returns.called)
            return returns.value;
        
        return result;
    };
    
    fn.args = [];
    fn.called = false;
    fn.callCount = 0;
    fn.calledWith = (...calledArgs) => calledWith({
        log,
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
    
    fn.rejects = (error) => {
        returns.rejected = true;
        returns.error = error;
        return fn;
    };
    
    fn.resolves = (value) => {
        returns.resolved = true;
        returns.value = value;
        return fn;
    };
    
    fn.returns = (value) => {
        returns.called = true;
        returns.value = value;
        
        return fn;
    };
    
    fn.__watermark = MARK;
    
    return fn;
}

